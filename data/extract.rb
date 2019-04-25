#!/usr/bin/env ruby
# encoding: utf-8
Dir.chdir(File.dirname(__FILE__))

require "json"
require "csv"
require "awesome_print"

YEARS = [2005, 2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060, 2070, 2080, 2090, 2100]
SCNEARIOS = [
	'PEP_2C_full_NDC',
	'PEP_2C_full_eff',
	'PEP_2C_full_goodpractice',
	'PEP_2C_full_netzero',
	'PEP_1p5C_full_NDC',
	'PEP_1p5C_full_eff',
	'PEP_1p5C_full_goodpractice',
	'PEP_1p5C_full_netzero',
	'PEP_2C_red_NDC',
	'PEP_2C_red_eff',
	'PEP_2C_red_goodpractice',
	'PEP_2C_red_netzero',
	'PEP_1p5C_red_NDC',
	'PEP_1p5C_red_eff',
	'PEP_1p5C_red_goodpractice',
	'PEP_1p5C_red_netzero'
]
VARIABLES = ['Emissions|CO2|Energy and Industrial Processes', 'Emissions|CO2|AFOLU']
REGIONS = ['World', 'CHN', 'USA', 'EUR', 'IND', 'RUS', 'JPN']

def readCSV (file)
  CSV.read("#{file}", { encoding: "UTF-8", headers: true, col_sep: ";" }).map { |d| d.to_hash }
end

def options (arr, var)
	arr.map { |d| d[var] }.uniq
end

def get (arr, obj)
	arr.select do |d|
		obj.all? do |key, options|
			options.include? d[key.to_s]
		end
	end
end

def format (arr)
	arr.map do |d|
		{
			model: d["﻿model"],
			scenario: d['scenario'],
			region: d['region'].sub('CHN', 'China').sub('EUR', 'EU').sub('IND', 'India').sub('RUS', 'Russia').sub('JPN', 'Japan'),
			variable: d['variable'].sub('Emissions|', ''),
			values: YEARS.map { |i| [i, d[i.to_s].sub(',', '.').to_f] }
		}
	end
end

data = readCSV('IPCC_SR1p5C_template_2018-03-14_PEP_complete-cropped.csv')

facet = {
	"scenario": SCNEARIOS,
	"variable": VARIABLES,
	"region": REGIONS
}

datum = format(get(data, facet))

historic = JSON.parse(File.open('historic.json').read)
datum.push(*historic)

File.open('data.json', 'w') do |f|
  f.write(JSON.pretty_generate({ data: datum }))
end

