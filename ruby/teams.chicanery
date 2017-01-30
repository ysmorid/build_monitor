require 'chicanery/cctray'
require 'json'
require_relative 'Common'
include Common

include Chicanery::Cctray

persist_state_to 'state'

when_run do |state|
  projects = []

  a1 = File.read(Common::DATA_DIR + 'A1.json')
  a1Parse = JSON.parse(a1)
  a2 = File.read(Common::DATA_DIR + 'A2.json')
  a2Parse = JSON.parse(a2)
  b3 = File.read(Common::DATA_DIR + 'B3.json')
  b3Parse = JSON.parse(b3)
  b4 = File.read(Common::DATA_DIR + 'B4.json')
  b4Parse = JSON.parse(b4)

  a1Count = 0;
  a1Failures = false;
  a1Building = false;
  a1Label = "";
  a1Parse.each do |map|
    map.each do |name, status, activity, label|
      if status == "failed"
        a1Failures = true
      end

      if activity == "building"
        a1Building = true
      end

      a1Label = label
    end
  end

  a2Failures = false;
  a2Building = false;
  a2Label = "";
  a2Parse.each do |map|
    map.each do |name, status, activity, label|
      if status == "failed"
        a2Failures = true
      end

      if activity == "building"
        a2Building = true
      end

      a2Label = label
    end
  end
  
  b3Failures = false;
  b3Building = false;
  b3Label = "";
  b3Parse.each do |map|
    map.each do |name, status, activity, label|
      if status == "failed"
        b3Failures = true
      end

      if activity == "building"
        b3Building = true
      end

      b3Label = label
    end
  end
  
  b4Failures = false;
  b4Building = false;
  b4Label = "";
  b4Parse.each do |map|
    map.each do |name, status, activity, label|
      if status == "failed"
        b4Failures = true
      end

      if activity == "building"
        b4Building = true
      end

      b4Label = label;
    end
  end

  projects << {
    "name" => "Team Battleship",
    "status" => (a1Failures ? "failures" : "success"),
    "activity" => (a1Building ? "building" : "sleeping"),
    "label" => a1Label
  }

  projects << {
    "name" => "A Squared",
    "status" => (a2Failures ? "failures" : "success"),
    "activity" => (a2Building ? "building" : "sleeping"),
    "label" => a2Label
  }

  projects << {
    "name" => "People 360",
    "status" => (b3Failures ? "failures" : "success"),
    "activity" => (b3Building ? "building" : "sleeping"),
    "label" => b3Label
  }

  projects << {
    "name" => "B404 Not Found",
    "status" => (b4Failures ? "failures" : "success"),
    "activity" => (b4Building ? "building" : "sleeping"),
    "label" => b4Label
  }

  File.open(Common::DATA_DIR + "TWU53.json", 'w+') {|f| f.puts projects.to_json }
end