# 🎬Movie Review PR (🎃Hacktoberfest 2021🎃)

Are you wanting to make your first open-source contribution and don't know where to start? Or maybe you're learning git. Whatever you're doing, the first thing you'll want to do is write a movie review! Wait, write a movie review? Well of course, we all love movies, right? Rate the worst movie you've ever seen or the one that made your eyes flood like the Hoover Dam. Once you've submitted your movie review as a <b>pull request</b>, you can view it, along with all the other contributors' reviews on the website for this repo.

Here's a really good intro for how to make a pull request: https://iq.opengenus.org/create-a-pull-request-at-github/

## How to contribute your movie review:

- Navigate to `/backend/reviews` and click on the dropdown `Add file`.
- From here, you can either `Create new file` or `Upload files`.
- Format your movie review in JSON format. You can <i>copy-paste</i> the below while <b>filling in the empty strings with your information</b>:
- ```
   {
     "name": "",
     "title": "",
     "rating": 0,
     "comment": ""
   }
   ```
 - Ex.
   ```
   {
     "name": "Aaron",
     "title": "Scarface",
     "rating": 8,
     "comment": "Chainsaws and bathtubs. What more can you ask for?"
   }
   ```
- <b>Make sure your file ends with .json and contains all the information in JSON format or else your review won't be processed.</b>
