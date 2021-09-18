const express = require("express");
const router = express.Router();
let Sujet = require("../models/sujet");

router.post("/add", function (req, res) {
  var newSujet = new Sujet();

  newSujet.titre = req.body.titre;
  newSujet.description = req.body.description;
  newSujet.vote = false;

  newSujet.save(function (err, insertedSujet) {
    if (err) {
      console.log("Error saving Sujet");
    } else {
      res.json(insertedSujet);
      console.log(insertedSujet);
    }
  });
});

router.get("/getAll", function (req, res) {
  console.log("Get request for all sujets");
  Sujet.find().exec(function (err, cat) {
    if (err) {
      console.log("error sujets");
    } else {
      res.json(cat);
    }
  });
});

router.get("/getSujet/:id", function (req, res) {
  Sujet.findById(req.params.id).exec(function (err, sujet) {
    if (err) {
      console.log("error sujet");
    } else {
      res.json(sujet);
    }
  });
});

router.get("/getOui/:id", function (req, res) {
  Sujet.findById(req.params.id).exec(function (err, sujet) {
    if (err) {
      console.log("error sujet");
    } else {
      res.json(sujet.oui);
    }
  });
});
router.get("/getTotal/:id", function (req, res) {
  Sujet.findById(req.params.id).exec(function (err, sujet) {
    if (err) {
      console.log("error sujet");
    } else {
      res.json(sujet.oui + sujet.non);
    }
  });
});

router.put("/oui/:id", function (req, res) {
  Sujet.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        oui: req.body.oui,
      },
    },

    {
      new: true,
    },
    function (err, vote) {
      if (err) {
        res.send("Error updating vote");
      } else {
        res.json(vote);
        console.log(req.body.vote);

        console.log("change", vote);
        console.log("update success");
      }
    }
  );
});
router.put("/non/:id", function (req, res) {
  Sujet.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        non: req.body.non,
      },
    },

    {
      new: true,
    },
    function (err, vote) {
      if (err) {
        res.send("Error updating vote");
      } else {
        res.json(vote);
        console.log(req.body.vote);

        console.log("change", vote);
        console.log("update success");
      }
    }
  );
});

router.put("/oui/:id", function (req, res) {
  Sujet.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        oui: req.body.oui,
      },
    },

    {
      new: true,
    },
    function func(err, vote) {
      if (err) {
        res.send("Error updating vote oui");
      } else {
        res.json(vote);
        console.log("change", vote);
        console.log("update oui success");
      }
    }
  );
  req.setTimeout(60 * 1000);
});

router.put("/non/:id", function (req, res) {
  Sujet.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        non: req.body.non,
      },
    },

    {
      new: true,
    },
    function (err, vote) {
      if (err) {
        res.send("Error updating vote non");
      } else {
        res.json(vote);

        console.log("change", vote);
        console.log("update non success");
      }
    }
  );
});

module.exports = router;
