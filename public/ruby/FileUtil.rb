module FileUtil
  	def save_file path, data
	    File.open(path, "w+") {
	    	|f| f.puts data 
	    }
  	end

  	def delete_file path
  		begin
  			File.delete(path) if File.exist?(path)
		rescue => e
			puts "*******************************"
			puts "#{e}"
			puts "*******************************"
		end		
	end	

	def has_file path
		File.exist?(path)
	end
end
