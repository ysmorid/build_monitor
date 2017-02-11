require "test/unit"
require_relative "../../public/ruby/FileUtil"

include FileUtil

class FileUtilTest < Test::Unit::TestCase
	def test_create_then_delete_file
		fileName = "File.txt"

		save_file(fileName, "");

		assert(has_file(fileName))

		delete_file(fileName)

		assert_false(has_file(fileName))
	end
end