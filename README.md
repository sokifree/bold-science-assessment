### Summary
I've interpreted the assessment as best I can here as there was some ambiguity (I do understand this may be a work in progress/part of the assesment).

### API

I've a few recommendations for improving the api usability, quality and consistency;
- 200 along with an empty array can be used for a successful query with no results, rather than a 400.
- It should return 400 for malformed query (any status code beginning with 4 informs the client they can do something to fix the request, whereas 500 would imply a server error)
- Wrapping the array of results with the count seems unnecessary unless it was alongside other pagination properties like offsets, page count, page number etc.
- The `top` param has limited use cases to me unless combined with an offset param.
- Countries endpoint `time_zone` => `time_zones`
- Inconsistency with `is_dst` bool vs `dst` number

And some more debatable preferences of mine:
- For json results I'd use camel case rather than snake case
- If needing different variants of results (e.g. one returning country name, and one not) I would achieve with different endpoints in order to keep concerns separate and make return values consistent with fewer toggles to limit unique paths through the system.
  - E.g. instead of `api/timezones?inc=true` it might be: `api/timezones/summaries` (without country details) and `api/timezones/details` (with country details).

### Assessment
Recommendations for improving the assessment to make a few ACs clearer;
- The User stories reference fields not relevant for the countries endpoints (e.g. tier, description, newest, oldest, numeric attribute).
- I think the assessment could probably be condensed to need a little less time while still evidencing the same set of knowledge.

Overall I focussed on getting the code right and using the time as a good refresher for react rather than writing the tests. If I had a bit more time I would spend time on tests for each bit of functionality too.

Look forward to any feedback

Sofia
