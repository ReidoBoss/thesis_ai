

const { Users, Post , Dataset} = require("../models/models.js");

// start swift aid backend
exports.getUsers = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getUsers((err, users) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error message",
      });
    }
    res.send(users);
  });
};

exports.getUserImage = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  console.log(req.body);
  Users.getUserImage(req.params.id, (err, image) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(image);
  });
};

exports.getSinglePost = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  console.log(req.body);
  Users.getSinglePost(req.params.id, (err, post) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(post);
  });
};


exports.getSinglePostReport = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  console.log(req.body);
  Post.getSinglePostReport(req.params.id, (err, post) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(post);
  });
};

exports.getAdmin = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getAdmin((err, admin) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error message",
      });
    }
    res.send(admin);
  });
};

exports.getOperator = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getOperator((err, operator) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error message",
      });
    }
    res.send(operator);
  });
};

exports.getSingleOperator = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  console.log(req.body);
  Users.getSingleOperator(req.params.id, (err, operator) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(operator);
  });
};


exports.getSingleResponder = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  console.log(req.body);
  Users.getSingleResponder(req.params.id, (err, responder) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(responder);
  });
};

exports.getResponder = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getResponder((err, responder) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error message",
      });
    }
    res.send(responder);
  });
};

exports.getPost = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getPost((err, post) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error message",
      });
    }
    res.send(post);
  });
};

exports.getPostReport = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getPostReport((err, post) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error message",
      });
    }
    res.send(post);
  });
};

//POSTERS

exports.addNewOperator = (req, res) => {
  try {
    if (!req.file) {
      throw { message: 'image is required' };
    }

    const operatorDetails = new Users({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      image: req.file.buffer,
      user_id: req.body.user_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      birthdate: req.body.birthdate,
      address: req.body.address,
      email: req.body.email,


    });

    Users.addNewOperator(operatorDetails, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Internal Server Error',
        });
        return;
      }

      res.status(201).send(result); 
    });
  } catch (error) {
    res.status(400).send({
      message: error.message || 'Bad Request',
    });
  }
};


exports.addOperator = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  

  const operatorDetails = new Users({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    image: req.file.buffer,
    user_id: req.body.user_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
    address: req.body.address,
    email: req.body.email,
    mobile_number: req.body.mobile_number,


  });
  Users.addOperator(operatorDetails, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Internal Server Error',
      });
      return;
    }

    res.status(201).send(result); 
  });
};


exports.addResponder = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  

  const responderDetails = new Users({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    image: req.file.buffer,
    user_id: req.body.user_id,
    department: req.body.department,
    institution: req.body.institution,
    mobile_number: req.body.mobile_number,
    email: req.body.email,
    city: req.body.city,
    zipcode: req.body.zipcode,
    address: req.body.address,


  });
  Users.addResponder(responderDetails, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Internal Server Error',
      });
      return;
    }

    res.status(201).send(result); 
  });
};


exports.addPosta = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  

  const operatorDetails = new Post({

    description: req.body.description,
    emergency_type: req.body.emergency_type,
    city: req.body.city,
    zipcode: req.body.zipcode,
    address: req.body.address,


  });
  Post.addPost(operatorDetails, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Internal Server Error',
      });
      return;
    }

    res.send(result); 
  });
};




exports.addPost = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  

  const agent = new Post({
    description: req.body.description,
    emergency_type: req.body.emergency_type,
    city: req.body.city,
    zipcode: req.body.zipcode,
    address: req.body.address,
  });

  Post.addPost(agent, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Property.",
      });
    }

    res.send(data);
  });
};

exports.addPostTeam = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  

  const postTeams = new Post({
    post_id: req.body.post_id,
    search_and_rescue: req.body.search_and_rescue,
    fire_department: req.body.fire_department,
    ngo: req.body.ngo,
    private_sector: req.body.private_sector,
    baranggay_tanod: req.body.baranggay_tanod,

  });

  Post.addPostTeam(postTeams, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Property.",
      });
    }

    res.send(data);
  });
};


exports.markPostAcknowledged = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Post ID cannot be empty",
    });
    return;
  }

  const postId = req.params.id;
  const newStatus = "acknowledged";

  Post.editPostStatus(postId, newStatus, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while updating the Post status.",
      });
    }

    res.send(data);
  });
};

exports.markPostDenied = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Post ID cannot be empty",
    });
    return;
  }

  const postId = req.params.id;
  const newStatus = "cancelled"; 

  Post.editPostStatus(postId, newStatus, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while updating the Post status.",
      });
    }

    res.send(data);
  });
};

exports.markPostSent = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Post ID cannot be empty",
    });
    return;
  }

  const postId = req.params.id;
  const newStatus = "sent"; 

  Post.editPostStatus(postId, newStatus, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while updating the Post status.",
      });
    }

    res.send(data);
  });
};





exports.markPostDenied = (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "Post ID cannot be empty",
    });
  }

  const postId = req.params.id;
  const newStatus = "cancelled";

  Post.editPostStatus(postId, newStatus, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while updating the Post status.",
      });
    }

    res.send(data);
  });
};

//editor
exports.updatePost = (req, res) => {
  const { responder_id, operator_id, additional_description, post_id } = req.body;

  const updatePost = {
    responder_id,
    operator_id,
    additional_description,
    post_id
  };

  Post.updatePost(updatePost, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Could not update post' });
    }
    return res.status(200).json({ message: 'Post updated successfully', data: result });
  });
};


exports.getDataset = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Dataset.getDataset((err, users) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error message",
      });
    }
    res.send(users);
  });
};