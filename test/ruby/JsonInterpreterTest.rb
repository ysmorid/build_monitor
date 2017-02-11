require "test/unit"
require_relative "../../public/ruby/JsonInterpreter"

include JsonInterpreter

class JsonInterpreterTest < Test::Unit::TestCase
	def test_one_one_one
		assert_equal(true, false)
	end
end