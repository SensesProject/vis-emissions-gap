#!/usr/bin/env ruby
# encoding: utf-8
Dir.chdir(File.dirname(__FILE__))

require "json"
require "csv"
require "awesome_print"

def readCSV (file)
  CSV.read("#{file}", { encoding: "UTF-8", headers: true, col_sep: ";" }).map { |d| d.to_hash }
end

def options (arr, var)
	arr.map { |d| d[var] }.uniq
end

def formatPolicy (policy)
	policy.sub('Cost-effective pricing', 'eff').sub('Cost-effective', 'eff').sub('Net Zero', 'netzero').sub('NDCs', 'NDC').sub('Good Practice', 'goodpractice')
end

def formatRegion (region)
	if region.nil?
		'World'
	else
		region.sub('CHN', 'China').sub('EUR', 'EU').sub('IND', 'India').sub('RUS', 'Russia').sub('JPN', 'Japan')
	end
end

def formatCDR (cdr)
	cdr.sub(' CDR', '').sub('.', '').downcase
end

def formatDegree (degree)
	degree.sub('.', 'p').sub('°', '')
end

def formatNumber (num)
	num.sub(',', '.').to_f
end

def splitTarget (target)
	if target.include? ','
		target.split ', '
	else
		first, second = target.split 'C '
		[first + 'C', second]
	end
end

def formatOutput (target, cdr, policy, region, values, variable)
	{
		degree: formatDegree(target),
		part: formatCDR(cdr),
		policy: formatPolicy(policy),
		region: formatRegion(region),
		values: values,
		variable: variable
	}
end

def formatDoubleVariable (arr1, arr2, variable)
	arr1.map do |d|
		target, cdr = splitTarget(d['target'])
		value0 = formatNumber(d['value'])
		partner = arr2.select { |p|
			p['target'] == d['target'] &&
			p['region'] == d['region'] &&
			p['policy'] == d['policy'] &&
			p['variable'] == d['variable']
		}
		value1 = formatNumber(partner[0]['value'])
		formatOutput(target, cdr, d['policy'], d['region'], [[2030, value0], [2050, value1]], variable)
	end
end

def formatTemperature (med, p66, p95)
	med.map do |d|
		_p66 = p66.select { |p|
			p['Scenario'] == d['Scenario']
		}
		_p95 = p95.select { |p|
			p['Scenario'] == d['Scenario']
		}
		model, target, cdr, policy = d['Scenario'].split('_')
		valueMed2050 = formatNumber(d['2050'])
		valueP662050 = formatNumber(_p66[0]['2050'])
		valueP952050 = formatNumber(_p95[0]['2050'])
		valueMed2100 = formatNumber(d['2100'])
		valueP662100 = formatNumber(_p66[0]['2100'])
		valueP952100 = formatNumber(_p95[0]['2100'])
		formatOutput(target, cdr, policy, "World", [[2050, { med: valueMed2050, p66: valueP662050, p95: valueP952050 }], [2100, { med: valueMed2100, p66: valueP662100, p95: valueP952100 }]], "temperature")
	end
end

def formatSingleVariable (arr, variable)
	arr.map do |d|
		target, cdr = splitTarget(d['target'])
		value = formatNumber(d['value'])
		formatOutput(target, cdr, d['policy'], d['region'], [[2030, value]], variable)
	end
end

data = readCSV('investment_numbers_regi.csv')

# Group price data
periods = data.select { |p| p['region'].eql? 'World' }.group_by { |i| i['period'] }
first = periods['2020-2030']
second = periods['2030-2050']

# And merge price data
datum = formatDoubleVariable(first, second, 'investment')

data = readCSV('LearnModule.csv')
landUse = data.select { |p| p['variable'].eql? 'Land area used' }
strandedAssests = data.select { |p| p['variable'].eql? 'Stranded assests' }
# temperature = data.select { |p| p['variable'].eql? 'Temperature' }

datum.push(*formatSingleVariable(landUse, 'landuse'))
datum.push(*formatSingleVariable(strandedAssests, 'strandedAssests'))

# Group temperature data
# temperatures = temperature.group_by { |i| i['period'] }
# first = temperatures['2030']
# second = temperatures['2050']

data = readCSV('PEP_temp_iamc-1.5c-explorer_snapshot_1588168249.csv')
variables = data.group_by { |i| i['Variable'] }
med = variables['AR5 climate diagnostics|Temperature|Global Mean|MAGICC6|MED']
p66 = variables['AR5 climate diagnostics|Temperature|Global Mean|MAGICC6|P66']
p95 = variables['AR5 climate diagnostics|Temperature|Global Mean|MAGICC6|P95']
datum.push(*formatTemperature(med, p66, p95))


# datum.push(*formatDoubleVariable(first, second, 'temperature'))

File.open('aside.json', 'w') do |f|
  f.write(JSON.pretty_generate({ data: datum }))
end

