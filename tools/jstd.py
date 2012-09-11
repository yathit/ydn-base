#!/usr/bin/python
"""Given a list of dependency list, generate .jstd for JS Test Driver.
"""
import os.path
import sys


def usage():
	"""Displays a message to the user when invalid input is supplied.
	alltest.py output_file js_test_directories
	"""
	print """Given a list of dependency list, generate .jstd for JS Test Driver.
	jstd.py input.txt output.jstd work.dir js_test_files js_load_files
	"""

def main():
	"""Prints the list of JS test files to standard out."""
	if len(sys.argv) < 3:
		usage()
		sys.exit(-1)
	else:
		input = open(sys.argv[1], 'r')
		output = open(sys.argv[2], 'w')
		work_dir = sys.argv[3]
		js_test_files = sys.argv[4]

		output.write("server: http://localhost:4224\n\n")

		output.write("load:\n")
		content = input.read()
		content = content.replace(work_dir, '  - ..')
		content = content.replace("\\", "/")
		output.write(content)

		if len(sys.argv) > 5:
			js_load_files = sys.argv[5]
			for js in js_load_files.split(','):
				output.write("  - %s\n" % js)

		output.write("\ntest:\n")
		jss = js_test_files.split(',')
		for js in jss:
			output.write("  - test/%s\n" % js)

		input.close()
		output.close()
		print "JSTD test file saved to %s" % sys.argv[1]
		sys.exit(0)

if __name__ == '__main__':
	main()

