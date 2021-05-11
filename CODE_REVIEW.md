These are my points of the code review

- One problem I detected right away was that the search bar brings    coincidences despite the string entry
- One improvement I will do is instead of calling the Action interface on every reducer, we can create a class that extends the Action interface in our actions file
- I did notice on the books reducer that in searchBookFailure they were missing some properties that were missing to pass (loaded and the error for example)

Lighthouse extension issues:
- Buttons do not have an accessible name
- Background and foreground colors do not have a suficient contrast ratio

My errors discoverded 
- The book cards has no border-radius just a a change of color without ratio 
- No separation between elements in reading list
- The "Want to read" text button should change when book is already in the list