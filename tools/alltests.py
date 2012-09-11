#!/usr/bin/python
"""Given a list of directories, prints out a JavaScript array of paths to files
that end in "_test.html". The output will look something like:
var _allTests = [
"example/emailvalidator_test.html", "example/factorial_test.html"];
"""
import os.path
import sys


def add_test_files(test_files, dirname, names):
	"""File names that end in "_test.html" are added to test_files."""

	root_dir = sys.argv[2]

	#print 'WALK: ' + wpath

	for name in names:
		path = os.path.join(dirname, name)
		if os.path.isdir(path):
			#print "extending path: %s" % wpath
			test_files.extend(find_test_files(path))
		elif os.path.isfile(path) and name.endswith('_test.html'):

			d = os.path.join(dirname.replace('\\', '/'), str(name))
			wpath = d[len(root_dir)+1:len(d)]
			pathJsArg = '"' + wpath + '"'

			#print pathJsArg + ' n ' + str(name)
			test_files.append(pathJsArg)

def find_test_files(directory):
	"""Returns the list of files in directory that end in "_test.html"."""
	if not os.path.exists(directory) or not os.path.isdir(directory):
		raise Exception('Not a directory: ' + directory)

	test_files = []
	os.path.walk(directory, add_test_files, test_files)

	return test_files

def usage():
	"""Displays a message to the user when invalid input is supplied.
	alltest.py output_file js_test_directories
	"""
	print 'Specify a list of directories that contain _test.html files'

def main():
	"""Prints the list of JS test files to standard out."""
	if len(sys.argv) < 3:
		usage()
		sys.exit(-1)
	else:
		base_dir = sys.argv[2]

		test_files = find_test_files(base_dir)
		f = open(sys.argv[1], 'w')
		f.write('var _allTests = [')
		test_files = set(test_files)
		f.write(', '.join(test_files) + '];')
		f.close()
		print "All test file saved to %s" % sys.argv[1]
		sys.exit(0)

if __name__ == '__main__':
	main()
