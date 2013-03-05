#!/usr/bin/python
"""Given a list of directories, prints out a JavaScript array of paths to files
that end in "_test.html". The output will look something like:
var _allTests = [
"example/emailvalidator_test.html", "example/factorial_test.html"];
"""
import os.path
import sys


def add_test_files(arg, dirname, names):
	"""File names that end in "_test.html" are added to test_files."""

	test_files = arg['files']
	ext = arg['ext']
	root_dir = sys.argv[2]

	#print 'WALK: ' + wpath

	for name in names:
		path = os.path.join(dirname, name)
		if os.path.isdir(path):
			#print "extending path: %s" % wpath
			test_files.extend(find_test_files(path, ext))
		elif os.path.isfile(path) and name.endswith(ext):

			d = os.path.join(dirname.replace('\\', '/'), str(name))
			wpath = d[len(root_dir)+1:len(d)]
			pathJsArg = '"' + wpath + '"'

			#print pathJsArg + ' n ' + str(name)
			test_files.append(pathJsArg)

def find_test_files(directory, ext = '_test.html'):
	"""Returns the list of files in directory that end in "_test.html"."""
	if not os.path.exists(directory) or not os.path.isdir(directory):
		raise Exception('Not a directory: ' + directory)

	test_files = []
	os.path.walk(directory, add_test_files, {'files': test_files, 'ext': ext})

	return test_files

def write_test_files(f, base_dir, ext = '_test.html', var = '_allTests'):
	"""Find test file and write to the file."""

	test_files = find_test_files(base_dir, ext)
	f.write('var %s = [' % var)
	test_files = set(test_files)
	f.write(', '.join(test_files) + '];\n')

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

		f = open(sys.argv[1], 'w')
		if (len(sys.argv) > 3 and sys.argv[3] == 'db'):
			write_test_files(f, base_dir, '_idb_test.html', '_idb_allTests')
			write_test_files(f, base_dir, '_websql_test.html', '_websql_allTests')
			write_test_files(f, base_dir, '_ls_test.html', '_ls_allTests')
		write_test_files(f, base_dir, '_test.html', '_allTests')
		f.close()
		print "All test file saved to %s" % sys.argv[1]
		sys.exit(0)

if __name__ == '__main__':
	main()
