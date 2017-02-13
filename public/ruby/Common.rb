module Common
	PATH = File.expand_path("../../", __FILE__)
	DATA_DIR = PATH + "/../data/"
	RUBY_DIR = PATH + "/../ruby/"
	RESOURCE_DIR = PATH + "/../resources/"

	BEAN = "BEAN"

	PIPELINEMAPS = {
	  "Freewheelers" => {
	    "Freewheelers_Web_App :: build" => "Build",
	    "Freewheelers_Web_App :: integration" => "Integration",
	    "Freewheelers_Web_App :: functional" => "Functional",
	    "Freewheelers_Web_App :: package" => "Package",
	    "Freewheelers_Web_App :: deploy-to-ci" => "CI",
	    "Freewheelers_Web_App :: deploy-to-qa" => "QA",
	    "Freewheelers_Web_App :: deploy-to-staging" => "Staging",
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
				pipelines[group] << Time.at(job_state[:last_build_time])
				pipelines[group] << job_state[:breaker]
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
				"url" => status[3],
				"time" => status[4],
				"breaker" => status[5]
			}
		end
		builds
    end

	def create_project_status pipeline_name, stages
		if stages
			failureCount = 0;
			buildingCount = 0;

			stages.each do |map|
				map.each do |name|
		        	if map["status"] == "failure"
		    			failureCount += 1;
		    		end
		        	if map["activity"] == "building"
						buildingCount += 1;
					end
				end
			end
			project = {
				"name" => pipeline_name,
				"status" => (failureCount > 0 ? "failure" : "success"),
				"activity" => (buildingCount > 0 ? "building" : "sleeping"),
				"url" => "#"+ pipeline_name
		    }
		else
			project = {
				"name" => "Error",
				"status" => "error",
				"activity" => "sleeping",
				"url" => "#"+ pipeline_name
		    }
		end
	end
end