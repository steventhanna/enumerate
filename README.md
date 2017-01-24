# Enumerate

[![Greenkeeper badge](https://badges.greenkeeper.io/steventhanna/enumerate.svg)](https://greenkeeper.io/)

The blogging platform for Computer Scientists

## API Breakdown

### User
  - First Name
  - Last Name
  - Display Name
  - Password
  - Email
  - storiesAuthored `array`
  - storiesSaved `array`
  - stack `array`
  - following `array`
  - followers `array`
  - history `array`
  - profileStyling

**History**: Save 10 days worth of stacks.  Overwrite oldest stack.

### Story
  - title
  - contents
  - images `array`
  - tags `array`
  - author
  - viewCount

**Image Handling**: Searching for a better option here... Probably just going to use Markdown like images, but if there are more than one image, create a gallery of sorts in-between the text.  Write an image handling solution using rust for maximum storage?  I don't really know about this.

### Tag
  - connections `array`
  - color
  - name

Each tag is a node in a net with connections with connections to related tags.  Eventually, with enough data, use machine learning to suggest tags to the user.  Recommendations are served based on tag connections

### Enumerate
  - Story List `array`
  - Tags `array`
  - popularStack `array`

### Stack
  - stories `array`

  The Stack is a mix of popular stories, recent stories on tags followed, and stories of people followed.  Content changes constantly.  Calling it the stack because of its use within the CS community.  

  The development of the algorithm that will create the stack must be ongoing, and very efficient, a challenge no doubt.
