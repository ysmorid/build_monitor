module JsonInterpreter
    def get_json path
    	begin
    		file = File.read(path)
			JSON.parse(file) 
		rescue => e
			puts "*******************************"
			puts "#{e}"
			puts "*******************************"
		end
  	end
end