# LIT website

This is the website codebase for the [LIT research group at the University of Michigan](http://lit.eecs.umich.edu/).

## How to make changes

Most of the website is dynamically generated from a set of CSV files. For most
of the changes that you'll need to make, all you need to do is change the CSV
file and the website will automatically update.
Here's some things that you might need to update:

* Adding a publication: update data/publications.csv
* Adding a download or demo: update data/publications.csv
* Adding/updating information about a person: update data/people.csv
* Adding a new reading group event: update data/reading_group.csv
* Adding a recent news item: update data/recent_news.csv
* Adding a sponsor: update data/sponsors.csv
* Adding a workshop or conference: update data/workshops_conferences.csv

Each CSV file has an associated README, detailing what data is stored in that
file and how to properly format each entry.

If you need to change something else not listed above, you might need to edit
the actual html/css/js. Feel free to contact Laura if you can't find the right
spot to change.

Once you've changed the appropriate files:

* Please don't push directly to the master branch (you shouldn't even have permission to do this).
* Instead, create your own branch, make the changes, and then
[submit a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
* Laura will accept the pull request and update the live website.
