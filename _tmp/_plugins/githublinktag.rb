#!/bin/env ruby
# encoding: utf-8

module Jekyll
  class GitHubLinkTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @repo = text.strip
      @travis = @repo.end_with?("!")
      @repo = @repo.chop if @travis
    end
    def render(context)
      content = "<a class=\"btn btn-primary btn-xs fui-github\" href=\"https://github.com/mkanai/#{@repo}\" target=\"_blank\" rel=\"noopener\"><span class=\"icon-text\">GitHub</span></a>"
      if @travis
        content += " <a href=\"https://travis-ci.org/mkanai/#{@repo}\" target=\"_blank\" rel=\"noopener\"><img src=\"https://travis-ci.org/mkanai/#{@repo}.svg?branch=master\" alt=\"Build Status\"></a>"
      end
      content
    end
  end
end
Liquid::Template.register_tag('github_link', Jekyll::GitHubLinkTag)
