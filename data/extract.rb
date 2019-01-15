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
VARIABLES = ['Emissions|CO2', 'Emissions|Kyoto Gases', 'Emissions|CO2|Fossil Fuels and Industry']
REGIONS = ['World']

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
			region: d['region'],
			variable: d['variable'],
			unit: d['unit'],
			values: YEARS.map { |i| d[i.to_s].sub!(',', '.').to_f }
		}
	end
end

data = readCSV('IPCC_SR1p5C_template_2018-03-14_PEP_complete-cropped.csv')

facet = {
	"scenario": SCNEARIOS,
	"variable": VARIABLES,
	"region": REGIONS
}

datum = get(data, facet)

puts datum.length

File.open('data.json', 'w') do |f|
  f.write(JSON.pretty_generate(format(datum)))
end

