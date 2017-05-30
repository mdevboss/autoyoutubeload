$(function() {
  $("form").on("submit", function(e) {
    e.preventDefault();

    var request = gapi.client.youtube.search.list({
      part: "snippet",
      type: "video",
      q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
      maxResult: 5,
      order: "viewCount",
      publishedAfter: "2015-01-01T00:00:00Z"
    });
    request.execute(function(response) {
      var results = response.result;
	  var index = 0;
      $.each(results.items, function(index, item) {
        $("#results").append(item.id.videoId+" "+item.snippet.title+"<br>");
		index++;
		if(index == 1)
			return false;
      });
	  if(results.items[0] == null)
		$("#results").append("NO RESULT"+"<br>");
    });
  });
});
function init() {
  gapi.client.setApiKey("AIzaSyAvCogdycmKrNPdfuYPh1GTv9aJfkmoYLM");
  gapi.client.load("youtube", "v3", function() {
  });
}
