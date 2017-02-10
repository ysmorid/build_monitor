require "test/unit"
require_relative "../../public/ruby/FileUtil"

include FileUtil

class FileUtilTest < Test::Unit::TestCase

	def test_createFile_then_deleteFile
		fileName = "File.txt"

		save_file(fileName, "");

		assert(has_file(fileName))

		delete_file(fileName)

		assert_false(has_file(fileName))
	end
end