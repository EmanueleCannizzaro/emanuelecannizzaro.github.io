#!/bin/env ruby
# encoding: utf-8

require "redcarpet"

module Jekyll
  class MarkdownBlock < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      content = super
      extensions = {}
      Jekyll.configuration({})['redcarpet']['extensions'].each { |e| extensions[e.to_sym] = true }
      "#{Redcarpet::Markdown.new(Redcarpet::Render::HTML.new(extensions), extensions).render(content)}"
    end
  end
end
Liquid::Template.register_tag('markdown', Jekyll::MarkdownBlock)
