module Common
	PATH = File.expand_path("../../", __FILE__)
	DATA_DIR = PATH + "/../data/"

	PIPELINEMAPS = {
	  "Freewheelers" => {
	    "Freewheelers_Web_App :: build" => "Build",
	    "Freewheelers_Web_App :: integration" => "Integration",
	    "Freewheelers_Web_App :: package" => "Package",
	    "Freewheelers_Web_App :: deploy-to-ci" => "CI",
	    "Freewheelers_Web_App :: deploy-to-qa" => "QA",
	    "Freewheelers_Web_App :: deploy-to-staging" => "Stage",
	    "Freewheelers_Web_App :: deploy-to-prod" => "Prod"
	  }
	}

	def collapse_jobs_to_pipelines jobs, map
		pipelines = {}

		jobs.each do |job_name, job_state|
			group = map[job_name]
			
			if group
				pipelines[group] ||= []
				pipelines[group] << job_state[:last_build_status]
				pipelines[group] << job_state[:activity]
				pipelines[group] << job_state[:last_label]
				pipelines[group] << job_state[:url]
				pipelines[group] << job_state[:last_build_time]
			end
		end
		pipelines
	end

	def get_builds pipelines
		builds = []
	    
	    pipelines.each do |name, status|
			builds << {
				"name" => name,
				"status" => status[0],
				"activity" => status[1],
				"label" => status[2],
				"url" => status[3]
			}
		end

		builds
    end
end