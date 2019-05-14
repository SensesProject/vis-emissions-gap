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

def format (arr1, arr2)
	arr1.map do |d|
		target, cdr = d['target'].split(', ')
		value0 = d['value'].sub(',', '.').to_f
		partner = arr2.select { |p|
			p['target'] == d['target'] &&
			p['region'] == d['region'] &&
			p['policy'] == d['policy'] &&
			p['variable'] == d['variable']
		}
		value1 = partner[0]['value'].sub(',', '.').to_f
		{
			model: 'REMIND-MAgPIE 1.7-3.0',
			scenario: 'PEP',
			degree: target.sub('.', 'p').sub('°', ''),
			part: cdr.sub(' CDR', '').sub('.', ''),
			policy: d['policy'].sub('Cost-effective pricing', 'eff').sub('Net Zero', 'netzero').sub('NDCs', 'NDC').sub('Good Practice', 'goodpractice'),
			region: d['region'].sub('CHN', 'China').sub('EUR', 'EU').sub('IND', 'India').sub('RUS', 'Russia').sub('JPN', 'Japan'),
			values: [value0, value1]
		}
	end
end

data = readCSV('investment_numbers_regi.csv')

periods = data.group_by { |i| i['period'] }

first = periods['2020-2030']
second = periods['2030-2050']

datum = format(first, second)

ap datum

# historic = JSON.parse(File.open('historic.json').read)
# datum.push(*historic)

File.open('prices-new.json', 'w') do |f|
  f.write(JSON.pretty_generate({ prices: datum }))
end

