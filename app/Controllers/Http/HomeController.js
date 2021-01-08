"use strict";
class HomeController {
  categories() {
    return [
      {
        id: 17,
        name: "Science and Nature",
        link:
          "https://images.unsplash.com/photo-1562445927-bdd32a655213?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 15,
        name: "Gaming",
        link:
          "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 11,
        name: "Film",
        link:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 12,
        name: "Music",
        link:
          "https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 25,
        name: "Art",
        link:
          "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 30,
        name: "Gadgets",
        link:
          "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 24,
        name: "Politics",
        link:
          "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 18,
        name: "Computers",
        link:
          "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=286&q=60",
      },
    ];
  }
  async index({ view }) {
    const categories = this.categories();
    return view.render("home", { categories });
  }
}

module.exports = HomeController;
