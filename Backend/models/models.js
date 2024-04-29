const sql = require("../config/config.js");


const Users = function (users) {


  this.user_id = users.user_id;
  this.username = users.username;
  this.password = users.password;
  this.role = users.role;
  this.image = users.image;
  this.first_name= users.first_name;
  this.last_name=users.last_name;
  this.gender= users.gender;
  this.birthdate= users.birthdate;
  this.address= users.address;
  this.email= users.email;

  this.department= users.department;
  this.institution= users.institution;
  this.mobile_number = users.mobile_number;
  this.city = users.city;
  this.zipcode = users.zipcode;
  

};

const Post = function (post) {


  this.post_id = post.post_id;
  this.description = post.description;
  this.emergency_type = post.emergency_type;
  this.status = post.status;
  this.city = post.city;
  this.zipcode = post.zipcode;
  this.address = post.address;
  this.address = post.address;

  this.responder_id = post.responder_id;
  this.operator_id = post.operator_id;
  this.additional_description = post.additional_description;

  //
  this.search_and_rescue = post.search_and_rescue;
  this.fire_department = post.fire_department;
  this.ngo = post.ngo;
  this.private_sector = post.private_sector;
  this.baranggay_tanod = post.baranggay_tanod;

};


const Dataset = function (data) {

  this.dataset_id = data.dataset_id;
  this.keyword = data.keyword;
  this.location = data.location;
  this.text = data.text;
  this.target = data.target;
};





//start of swiftaid backend
Users.getUsers = (result) => {
  sql.query(
    "SELECT username, password,role FROM users",
    (err, res) => {
      if (err) {
        console.log("Error in executing getuseres query: ", err);
        result(err, null);
        return;
      }
      const userDetails = res.map((row) => ({
        username: row.username,
        password: row.password,
        role: row.role,
      }));

      console.log(...userDetails);
      result(null, userDetails);
    }
  );
};

Users.getUserImage = (user_id, result) => {
  sql.query(
    "SELECT  user_id, image FROM users WHERE user_id= ? ",
    [user_id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing property_table query", error);
        result(error, null);
        return;
      }
      const image_result = queryResult.map((row) => ({
        user_id: row.user_id,
        image: row.image,
        
      }));


      result(null, image_result);
    }
  );
};

Users.getUsers = (result) => {
  sql.query(
    "SELECT user_id, username, password,role FROM users",
    (err, res) => {
      if (err) {
        console.log("Error in executing property_nearest_table query: ", err);
        result(err, null);
        return;
      }
      const userDetails = res.map((row) => ({
        user_id:row.user_id,
        username: row.username,
        password: row.password,
        role: row.role,
      }));

      console.log(...userDetails);
      result(null, userDetails);
    }
  );
};

Users.getAdmin = (result) => {
  sql.query(
    "SELECT admin_id, user_id,first_name,last_name FROM admin",
    (err, res) => {
      if (err) {
        console.log("Error in executing property_nearest_table query: ", err);
        result(err, null);
        return;
      }
      const adminDetails = res.map((row) => ({
        admin_id: row.admin_id,
        user_id: row.user_id,
        first_name: row.first_name,
        last_name: row.last_name
      }));

      result(null, adminDetails);
    }
  );
};
Users.getOperator = (result) => {
  sql.query(
    "SELECT operator_id	, user_id, first_name,last_name, gender,birthdate, address, email, mobile_number FROM operator",
    (err, res) => {
      if (err) {
        console.log("Error in executing property_nearest_table query: ", err);
        result(err, null);
        return;
      }
      const operatorDetails = res.map((row) => ({
        operator_id: row.operator_id,
        user_id: row.user_id,
        first_name: row.first_name,
        last_name: row.last_name,
        gender: row.gender,
        birthdate: row.birthdate,
        address: row.address,
        email: row.email,
        mobile_number: row.mobile_number,

      }));

      console.log(...operatorDetails);
      result(null, operatorDetails);
    }
  );
};

Users.getSingleOperator = (operator_id, result) => {
  sql.query(
    "SELECT   operator_id, user_id, first_name,last_name, gender, birthdate, address, email,mobile_number FROM operator WHERE operator_id= ? ",
    [operator_id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing operator table query", error);
        result(error, null);
        return;
      }
      const operator_result = queryResult.map((row) => ({
        user_id: row.user_id,
        operator_id: row.operator_id,
        first_name: row.first_name,
        last_name: row.last_name,
        gender: row.gender,
        birthdate: row.birthdate,
        address: row.address,
        email: row.email,
        mobile_number: row.mobile_number,
      }));


      result(null, operator_result);
    }
  );
};

Users.getSingleResponder = (operator_id, result) => {
  sql.query(
    "SELECT   responder_id, user_id, department,institution, mobile_number, email, city,zipcode, address FROM responder WHERE responder_id= ? ",
    [operator_id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing operator table query", error);
        result(error, null);
        return;
      }
      const responder_result = queryResult.map((row) => ({
        responder_id:row.responder_id,
        user_id: row.user_id,
        department: row.department,
        institution: row.institution,
        mobile_number: row.mobile_number,
        email: row.email,
        city: row.city,
        zipcode: row.zipcode,
        address: row.address,

      }));


      result(null, responder_result);
    }
  );
};

Users.getResponder = (result) => {
  sql.query(
    "SELECT responder_id	, user_id, department,institution, mobile_number, email, city, zipcode, address FROM responder",
    (err, res) => {
      if (err) {
        console.log("Error in executing property_nearest_table query: ", err);
        result(err, null);
        return;
      }
      const responderDetails = res.map((row) => ({
        responder_id: row.responder_id,
        user_id: row.user_id,
        department: row.department,
        institution: row.institution,
        mobile_number: row.mobile_number,
        email: row.email,
        city: row.city,
        zipcode: row.zipcode,
        address: row.address,


      }));

      console.log(...responderDetails);
      result(null, responderDetails);
    }
  );
};

Users.getPost = (result) => {
  sql.query(
    "SELECT post_id, description, timestamp, emergency_type, status,city, zipcode, address FROM post",
    (err, res) => {
      if (err) {
        console.log("Error in executing property_nearest_table query: ", err);
        result(err, null);
        return;
      }
      const postDetails = res.map((row) => ({
        post_id: row.post_id,
        description: row.description,
        timestamp: row.timestamp,
        emergency_type: row.emergency_type,
        status: row.status,
        city: row.city,
        zipcode: row.zipcode,
        address: row.address

      }));

      result(null, postDetails);
    }
  );
};

Users.getSinglePost = (post_id, result) => {
  sql.query(
    "SELECT  description, timestamp, emergency_type, city, zipcode, address FROM post WHERE post_id= ? ",
    [post_id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing property_table query", error);
        result(error, null);
        return;
      }
      const post_result = queryResult.map((row) => ({
        post_id: row.post_id,
        description: row.description,
        timestamp: row.timestamp,
        emergency_type: row.emergency_type,
        city: row.city,
        zipcode: row.zipcode,
        address: row.address,

      }));


      result(null, post_result);
    }
  );
};

Users.getPostReport = (result) => {
  sql.query(
    "SELECT report_id, post_id, responder_id, operator_id, additional_description FROM post_report",
    (err, res) => {
      if (err) {
        console.log("Error in executing property_nearest_table query: ", err);
        result(err, null);
        return;
      }
      const reportDetails = res.map((row) => ({
        report_id: row.report_id,
        post_id: row.post_id,
        responder_id: row.responder_id,
        operator_id: row.operator_id,
        additional_description: row.additional_description,


      }));

      result(null, reportDetails);
    }
  );
};
Post.getSinglePostReport = (report_id, result) => {
  sql.query(
    "SELECT  post_id, responder_id, operator_id, additional_description FROM post_report WHERE report_id= ? ",
    [report_id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing property_table query", error);
        result(error, null);
        return;
      }
      const post_result = queryResult.map((row) => ({
        post_id: row.post_id,
        responder_id: row.responder_id,
        operator_id: row.operator_id,
        additional_description: row.additional_description,

      }));


      result(null, post_result);
    }
  );
};


//----------------------------------------------------
//POSTERS


Users.addOperator = (newOperator, result) => {
  const role = "operator";
  sql.query(
    "INSERT INTO users SET ?",
    {
      username: newOperator.username,
      password: newOperator.password,
      role: role,
      image: newOperator.image,

    },
    (error, results) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      const userId = results.insertId;


      sql.query(
        "INSERT INTO operator SET ?",
        {
          user_id: userId,
          first_name: newOperator.first_name,
          last_name: newOperator.last_name,
          gender: newOperator.gender,
          birthdate: newOperator.birthdate,
          address: newOperator.address,
          email: newOperator.email,
          mobile_number: newOperator.mobile_number,

        });


      result(null, { ...newOperator });
    }
  );
};

Users.addResponder = (newResponder, result) => {
  const role = "responder";
  sql.query(
    "INSERT INTO users SET ?",
    {
      username: newResponder.username,
      password: newResponder.password,
      role: role,
      image: newResponder.image,

    },
    (error, results) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      const userId = results.insertId;


      sql.query(
        "INSERT INTO responder SET ?",
        {
          user_id: userId,
          department: newResponder.department,
          institution: newResponder.institution,
          mobile_number: newResponder.mobile_number,
          email: newResponder.email,
          city: newResponder.city,
          zipcode: newResponder.zipcode,
          address: newResponder.address,

        });


      result(null, { ...newResponder });
    }
  );
};


Post.addPost = (newPost, result) => {
  const status = "pending";
  sql.query(
    "INSERT INTO post SET ?",
    {
      description: newPost.description,
      emergency_type: newPost.emergency_type,
      status: status,
      city: newPost.city,
      zipcode: newPost.zipcode,
      address: newPost.address,

    },
    (error, results) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      const postId = results.insertId;


      sql.query(
        "INSERT INTO post_report SET ?",
        {
          post_id: postId,
          responder_id: newPost.responder_id,
          operator_id: newPost.operator_id,
          additional_description: newPost.additional_description,

        });


      result(null, { ...newPost });
    }
  );
};

Post.editPostStatus = (postId, newStatus, result) => {
  sql.query(
    "UPDATE post SET status = ? WHERE post_id = ?",
    [newStatus, postId],
    (error, results) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }

      result(null, { postId: postId, status: newStatus });
    }
  );
};




//
Post.addPostTeam = (postTeam, result) => {
  sql.query(
    "INSERT INTO post_additional_team SET ?",
    {
      post_id: postTeam.post_id,
      search_and_rescue: postTeam.search_and_rescue,
      fire_department: postTeam.fire_department,
      ngo: postTeam.ngo,
      private_sector: postTeam.private_sector,
      baranggay_tanod: postTeam.baranggay_tanod,

    },
    (error, results) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      result(null, { ...postTeam });
    }
  );
};

//editors
Post.updatePost = (updatePost, result) => {
  sql.query(
    "UPDATE post_report SET responder_id = ?, operator_id = ?, additional_description = ? WHERE post_id = ?",
    [updatePost.responder_id, updatePost.operator_id, updatePost.additional_description, updatePost.post_id],
    (error, results) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      if (results.affectedRows === 0) {
        // If no rows were affected, it means there was no matching post_id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { ...updatePost });
    }
  );
}

//start of swiftaid backend
Dataset.getDataset = (result) => {
  sql.query(
    "SELECT * FROM dataset",
    (err, res) => {
      if (err) {
        console.log("Error in executing getuseres query: ", err);
        result(err, null);
        return;
      }
      const dataset = res.map((row) => ({
        text: row.text,
        target: row.target,

      }));

      result(null, dataset);
    }
  );
};






module.exports = Users;
module.exports = Post;

module.exports.Dataset = Dataset;
module.exports.Users = Users;
module.exports.Post = Post;
