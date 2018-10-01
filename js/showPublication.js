//Template:
//<h2 class="featurette-heading">2016</h2>
//<h2 class="featurette-heading">2016</h2>
//<p class="lead-slim"><b>What’s Hot in Human Language Technology: Highlights from NAACL HLT 2015</b>(<a href="">pdf</a>, <a href="">demo</a>, <a href="">data</a>, <a href="">software</a>)</p>
//<p class="lead-slim-indent">Joyce Y. Chai, Anoop Sarkar, Rada Mihalcea</p>
//<p class="lead-slim-indent"><em>30th AAAI Conference on Artificial Intelligence, 2016</em></p>

//@param includeDownloadLink
//  Boolean - should you link to the downloads page? (if you're already on the downloads page, no; if not, maybe?)

function showPublication(publication,includeDownloadLink) {
    if(!publication.title) {
        return '';
    }
    var entry = '<p class="lead-slim"><b>' + publication.title + '</b>';
    if(publication.link || publication.demo || publication.data || publication.software || publication.abstract || publication.bibtex || publication.poster) {
        entry = entry + ' ('
        if(publication.link) {
            entry = entry + '<a href="' + publication.link + '" target="_blank">pdf</a>';
            if(publication.demo || publication.data || publication.software || publication.abstract || publication.bibtex || publication.poster) {
                entry = entry + ', ';
            }
        }
        if(publication.demo) {
            entry = entry + '<a href="' + publication.demo + '" target="_blank">demo</a>';
            if(publication.data || publication.software || publication.abstract || publication.bibtex || publication.poster) {
                entry = entry + ', ';
            }
        }
        if(publication.data) {
            entry = entry + '<a href="' + publication.data + '" target="_blank">data</a>';
            if(publication.software || publication.abstract || publication.bibtex || publication.poster) {
                entry = entry + ', ';
            }
        } 
        if(publication.software) {
            entry = entry + '<a href="' + publication.software + '" target="_blank">software</a>';
            if(publication.abstract || publication.bibtex || publication.poster) {
                entry = entry + ', ';
            }
        }
        if(publication.abstract) {
            entry = entry + '<a class="link-no-underline" data-toggle="collapse" data-parent="#accordion" href="#' + publication.id + '_abstract">abstract</a>';
            if(publication.bibtex || publication.poster) {
                entry = entry + ', ';
            }
        }
        if(publication.bibtex) {
            entry = entry + '<a class="link-no-underline" data-toggle="collapse" data-parent="#accordion" href="#' + publication.id + '_bibtex">BibTeX</a>';
			if(publication.poster) {
				entry = entry + ', ';
			}
        }
		if(publication.poster) {
			entry = entry + '<a class="link-no-underline" href="posters/'+publication.poster+'.pdf" target="_blank">poster</a>';
		}
        entry = entry + ')';
    }
	if(publication.notes) {
		entry = entry + '</p><p class="lead-slim"><span class="publication_notes">'+publication.notes+'</span>'
	}
    entry = entry + '</p><p class="lead-slim-indent">' + publication.authors + '</p>'

    if(includeDownloadLink && publication.download=="TRUE") {
        entry = entry + '<p class="lead-slim-indent"><em>' + publication.publication + '</em></p>';
        entry = entry + '<p class="lead-slim-bottom">**More detailed resources for this paper can be found on the <a href="downloads.html" onclick="setDownloadsCookie(' + publication.id + ');">downloads</a> page.</p>';
    } else {
        entry = entry + '<p class="lead-slim-indent-bottom"><em>' + publication.publication + '</em></p>';
    }
    
    if(publication.abstract) {
        entry = entry + '<div id="' + publication.id + '_abstract" class="panel-collapse collapse out">';
        entry = entry + '<p class="lead-slim-bottom">' + publication.abstract + '</p></div>';
    }
    if(publication.bibtex) {
        entry = entry + '<div id="' + publication.id + '_bibtex" class="panel-collapse collapse out">';
        entry = entry + '<p class="lead-slim-bottom bibtex">' + publication.bibtex + '</p></div>';
    }

    return entry;
}

function setDownloadsCookie(id) {
    $.cookie("downloadId", id);
}
