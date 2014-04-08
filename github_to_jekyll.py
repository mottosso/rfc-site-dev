"""
Convert Abstract Factory RFC markdown-file into
jekyll-compatible markdown.

File is written to a /jekyll parent directory:
    from    -- /spec1.md
    to      -- /jekyll/1.md

"""

import os
import sublime, sublime_plugin

DIV = '\n\n'


def groups(content):
    """
    Return a generator of groups within `content`
    Groups are blocks of text separated by an empty line.

    """

    for group in content.split(DIV):
        yield group


def parse(content):
    """Convert `content` into dictionary"""
    gen = groups(content)

    title = gen.next().strip("# ")
    summary = gen.next()
    properties = gen.next()

    if properties.startswith('!'):
        # This is an optional image
        properties = gen.next()

    # legal = gen.next()

    dproperties = {}
    for prop in properties.splitlines():
        prop = prop.strip("* ")
        key, value = (prop.split(": ", 1) + [''])[:2]
        dproperties[key] = value

    content = DIV.join([g for g in gen])

    result = {'title': title,
              'summary': summary,
              'properties': dproperties,
              # 'legal': legal,
              'content': content}

    return result


def to_jekyll_header(parsed):
    """Using parsed content, construct Jekyll header"""
    jp = []
    jp.append('layout: spec')
    jp.append('number: %s' % parsed['number'])
    jp.append('title: %s' % parsed['title'])
    jp.append('summary: %s' % parsed['summary'])

    header = '---\n%s\n---\n'
    header = header % '\n'.join(jp)

    return header


class ToJekyllCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        """
        Parse currently open file, and write it out to:
        
            /jekyll/##.md

        Where ## represents the number of the RFC

        """

        self.view.run_command('save')

        source_file = self.view.file_name()

        with open(source_file) as f:
            content = f.read()

        # Only allow ASCII
        try:
            content.decode('ascii')
        except UnicodeDecodeError as e:
            # block = content[(e.end - 10): (e.end + 10)]
            raise ValueError("Found non-ascii characters "
                             "in document %s"
                             % source_file)

        # Append property derived from `source_file`
        parsed = parse(content)

        basename = os.path.basename(source_file)
        name, ext = os.path.splitext(basename)
        number = name.strip("spec")

        parsed['number'] = number

        # Merge original content with jekyll header
        jekyll_header = to_jekyll_header(parsed)
        jekyll_document = jekyll_header + content

        # Construct output path
        root_directory = os.path.dirname(source_file)
        output_directory = os.path.join(root_directory, 'jekyll')
        output_file = '%s.md' % number
        output_path = os.path.join(output_directory, output_file)

        if not os.path.exists(output_directory):
            os.path.mkdir(output_directory)

        print "Writing Jekyll file %s" % output_path

        with open(output_path, 'w') as f:
            f.write(jekyll_document)

        return True