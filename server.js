const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const data = require('./data');
const neo4j = require('neo4j-driver');
const app = express();
const fs = require('fs');
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '123456'));
const session = driver.session();
app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
var jsonParser = bodyParser.json();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `./uploads/${req.body.voterId}`
    fs.exists(dir, exist => {
      if (!exist) {
        return fs.mkdir(dir, error => cb(error, dir))
      }
      return cb(null, dir)
    })
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/fetch-all-relations', (req, res) => {
  const voterId = req.query.voterId;

  session
    .run('MATCH (n:Person{voterId: $voterId})-[r]->() RETURN r', { voterId })
    .then((result) => {
      let relationArr = [];
      result.records.forEach(function (record) {
        relationArr.push({
          id: record._fields[0].identity.low,
          name: record._fields[0].properties.name ? record._fields[0].properties.name : "",
          aadharCardNo: record._fields[0].properties.aadharNo ? record._fields[0].properties.aadharNo : "",
          voterId: record._fields[0].properties.voterId ? record._fields[0].properties.voterId : "",
          dateOfBirth: record._fields[0].properties.relationDob ? record._fields[0].properties.relationDob : "",
          houseNo: record._fields[0].properties.houseNo ? record._fields[0].properties.houseNo : "",
          mohalla: record._fields[0].properties.mohalla ? record._fields[0].properties.mohalla : "",
          district: record._fields[0].properties.district ? record._fields[0].properties.district : "",
          village: record._fields[0].properties.village ? record._fields[0].properties.village : "",
          ward: record._fields[0].properties.ward ? record._fields[0].properties.ward : "",
          panchayat: record._fields[0].properties.panchayat ? record._fields[0].properties.panchayat : "",
          tehsil: record._fields[0].properties.tehsil ? record._fields[0].properties.tehsil : "",
          block: record._fields[0].properties.block ? record._fields[0].properties.block : "",
          relation: record._fields[0].type
        })
      });
      res.send(relationArr);
    })
    .catch((err) => console.log(err));
});

app.get('/api/fetch-all-schools', (req, res) => {
  const voterId = req.query.voterId;

  session
    .run('MATCH (a:Person),(b:Schools) WHERE a.voterId = $voterId AND b.voterId = $voterId RETURN b', { voterId })
    .then((result) => {
      let schoolArr = [];
      result.records.forEach(function (record) {
        schoolArr.push({
          id: record._fields[0].identity,
          schoolName: record._fields[0].properties.schoolName ? record._fields[0].properties.schoolName : "",
          degreeName: record._fields[0].properties.degreeName ? record._fields[0].properties.degreeName : "",
          aadharCardNo: record._fields[0].properties.aadharNo ? record._fields[0].properties.aadharNo : "",
          voterId: record._fields[0].properties.voterId ? record._fields[0].properties.voterId : "",
          dateOfPassing: record._fields[0].properties.dateOfPassing ? record._fields[0].properties.dateOfPassing : "",
          schoolAddress: record._fields[0].properties.schoolAddress ? record._fields[0].properties.schoolAddress : "",
        })
      });
      res.send(schoolArr);
    })
    .catch((err) => console.log(err));
});

app.get('/api/fetch-all-colleges', (req, res) => {
  const voterId = req.query.voterId;

  session
    .run('MATCH (a:Person),(b:Colleges) WHERE a.voterId = $voterId AND b.voterId = $voterId RETURN b', { voterId })
    .then((result) => {
      let collegeArr = [];
      result.records.forEach(function (record) {
        collegeArr.push({
          id: record._fields[0].identity,
          collegeName: record._fields[0].properties.collegeName ? record._fields[0].properties.collegeName : "",
          degreeName: record._fields[0].properties.degreeName ? record._fields[0].properties.degreeName : "",
          aadharCardNo: record._fields[0].properties.aadharNo ? record._fields[0].properties.aadharNo : "",
          voterId: record._fields[0].properties.voterId ? record._fields[0].properties.voterId : "",
          dateOfPassing: record._fields[0].properties.dateOfPassing ? record._fields[0].properties.dateOfPassing : "",
          collegeAddress: record._fields[0].properties.collegeAddress ? record._fields[0].properties.collegeAddress : "",
        })
      });
      res.send(collegeArr);
    })
    .catch((err) => console.log(err));
});

app.get('/api/fetch-all-occupations', (req, res) => {
  const voterId = req.query.voterId;

  session
    .run('MATCH (a:Person),(b:Occupations) WHERE a.voterId = $voterId AND b.voterId = $voterId RETURN b', { voterId })
    .then((result) => {
      let occupationArr = [];
      result.records.forEach(function (record) {
        occupationArr.push({
          id: record._fields[0].identity,
          occupationName: record._fields[0].properties.occupationName ? record._fields[0].properties.occupationName : "",
          position: record._fields[0].properties.position ? record._fields[0].properties.position : "",
          aadharCardNo: record._fields[0].properties.aadharNo ? record._fields[0].properties.aadharNo : "",
          voterId: record._fields[0].properties.voterId ? record._fields[0].properties.voterId : "",
          lastWorkingDate: record._fields[0].properties.lastWorkingDate ? record._fields[0].properties.lastWorkingDate : "",
          occupationAddress: record._fields[0].properties.occupationAddress ? record._fields[0].properties.occupationAddress : "",
        })
      });
      res.send(occupationArr);
    })
    .catch((err) => console.log(err));
});

app.post('/api/delete-user', jsonParser, (req, res) => {
  let voterId = req.body.voterId;

  session
    .run("MATCH (a:Person) WHERE a.voterId = $voterId DETACH DELETE a", { voterId }
    )
    .then(() => {
      res.json({
        status: "ok",
      });
      return;
    })
    .catch();

});

app.post('/api/delete-relation', jsonParser, (req, res) => {
  let relationType = req.body.relationType;
  let personVoterId = req.body.personVoterId;
  let relationVoterId = req.body.relationVoterId;

  switch (relationType) {
    case "FATHER": session
      .run("MATCH (a:Person)-[r:FATHER]->(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId DELETE r", { personVoterId, relationVoterId }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "MOTHER": session
      .run("MATCH (a:Person)-[r:MOTHER]->(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId DELETE r", { personVoterId, relationVoterId }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "BROTHER": session
      .run("MATCH (a:Person)-[r:BROTHER]->(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId DELETE r", { personVoterId, relationVoterId }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "SISTER": session
      .run("MATCH (a:Person)-[r:SISTER]->(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId DELETE r", { personVoterId, relationVoterId }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "SON": session
      .run("MATCH (a:Person)-[r:SON]->(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId DELETE r", { personVoterId, relationVoterId }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "DAUGHTER": session
      .run("MATCH (a:Person)-[r:DAUGHTER]->(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId DELETE r", { personVoterId, relationVoterId }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "HUSBAND": session
      .run("MATCH (a:Person)-[r:HUSBAND]->(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId DELETE r", { personVoterId, relationVoterId }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "WIFE": session
      .run("MATCH (a:Person)-[r:WIFE]->(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId DELETE r", { personVoterId, relationVoterId }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "FRIEND": session
      .run("MATCH (a:Person)-[r:FRIEND]->(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId DELETE r", { personVoterId, relationVoterId }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    default: return;
  }

});

app.post('/api/delete-school', jsonParser, (req, res) => {
  let voterId = req.body.voterId;
  let schoolName = req.body.schoolName;

  session
    .run("MATCH (a:Schools) WHERE a.voterId = $voterId AND a.schoolName = $schoolName DETACH DELETE a", { voterId, schoolName }
    )
    .then(() => {
      res.json({
        status: "ok",
      });
      return;
    })
    .catch();

});

app.post('/api/delete-college', jsonParser, (req, res) => {
  let voterId = req.body.voterId;
  let collegeName = req.body.collegeName;

  session
    .run("MATCH (a:Colleges) WHERE a.voterId = $voterId AND a.collegeName = $collegeName DETACH DELETE a", { voterId, collegeName }
    )
    .then(() => {
      res.json({
        status: "ok",
      });
      return;
    })
    .catch();
});

app.post('/api/delete-occupation', jsonParser, (req, res) => {
  let voterId = req.body.voterId;
  let occupationName = req.body.occupationName;

  session
    .run("MATCH (a:Occupations) WHERE a.voterId = $voterId AND a.occupationName = $occupationName DETACH DELETE a", { voterId, occupationName }
    )
    .then(() => {
      res.json({
        status: "ok",
      });
      return;
    })
    .catch();

});

app.post("/api/save-relation-details", jsonParser, async (req, res) => {
  let relationType = req.body.relationType;
  let personVoterId = req.body.personVoterId;
  let relationVoterId = req.body.relationVoterId;
  let relationName = req.body.relationName;
  let relationDob = req.body.relationDob;
  let houseNo = req.body.houseNo;
  let mohalla = req.body.mohalla;
  let village = req.body.village;
  let ward = req.body.ward;
  let panchayat = req.body.panchayat;
  let block = req.body.block;
  let tehsil = req.body.tehsil;
  let district = req.body.district;

  switch (relationType) {
    case "father": session
      .run("MATCH (a:Person),(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId CREATE (a)-[r:FATHER{name: $relationName, relationDob: $relationDob, voterId: $relationVoterId, houseNo: $houseNo, mohalla: $mohalla, village: $village, ward: $ward, panchayat: $panchayat, block: $block, tehsil: $tehsil, district: $district}]->(b) RETURN type(r)",
        { personVoterId, relationVoterId, relationType, relationName, relationDob, houseNo, mohalla, village, ward, panchayat, block, tehsil, district }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "mother": session
      .run("MATCH (a:Person),(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId CREATE (a)-[r:MOTHER{name: $relationName, relationDob: $relationDob, voterId: $relationVoterId, houseNo: $houseNo, mohalla: $mohalla, village: $village, ward: $ward, panchayat: $panchayat, block: $block, tehsil: $tehsil, district: $district}]->(b) RETURN type(r)",
        { personVoterId, relationVoterId, relationType, relationName, relationDob, houseNo, mohalla, village, ward, panchayat, block, tehsil, district }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "brother": session
      .run("MATCH (a:Person),(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId CREATE (a)-[r:BROTHER{name: $relationName, relationDob: $relationDob, voterId: $relationVoterId, houseNo: $houseNo, mohalla: $mohalla, village: $village, ward: $ward, panchayat: $panchayat, block: $block, tehsil: $tehsil, district: $district}]->(b) RETURN type(r)",
        { personVoterId, relationVoterId, relationType, relationName, relationDob, houseNo, mohalla, village, ward, panchayat, block, tehsil, district }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "sister": session
      .run("MATCH (a:Person),(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId CREATE (a)-[r:SISTER{name: $relationName, relationDob: $relationDob, voterId: $relationVoterId, houseNo: $houseNo, mohalla: $mohalla, village: $village, ward: $ward, panchayat: $panchayat, block: $block, tehsil: $tehsil, district: $district}]->(b) RETURN type(r)",
        { personVoterId, relationVoterId, relationType, relationName, relationDob, houseNo, mohalla, village, ward, panchayat, block, tehsil, district }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "son": session
      .run("MATCH (a:Person),(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId CREATE (a)-[r:SON{name: $relationName, relationDob: $relationDob, voterId: $relationVoterId, houseNo: $houseNo, mohalla: $mohalla, village: $village, ward: $ward, panchayat: $panchayat, block: $block, tehsil: $tehsil, district: $district}]->(b) RETURN type(r)",
        { personVoterId, relationVoterId, relationType, relationName, relationDob, houseNo, mohalla, village, ward, panchayat, block, tehsil, district }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "daughter": session
      .run("MATCH (a:Person),(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId CREATE (a)-[r:DAUGHTER{name: $relationName, relationDob: $relationDob, voterId: $relationVoterId, houseNo: $houseNo, mohalla: $mohalla, village: $village, ward: $ward, panchayat: $panchayat, block: $block, tehsil: $tehsil, district: $district}]->(b) RETURN type(r)",
        { personVoterId, relationVoterId, relationType, relationName, relationDob, houseNo, mohalla, village, ward, panchayat, block, tehsil, district }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "husband": session
      .run("MATCH (a:Person),(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId CREATE (a)-[r:HUSBAND{name: $relationName, relationDob: $relationDob, voterId: $relationVoterId, houseNo: $houseNo, mohalla: $mohalla, village: $village, ward: $ward, panchayat: $panchayat, block: $block, tehsil: $tehsil, district: $district}]->(b) RETURN type(r)",
        { personVoterId, relationVoterId, relationType, relationName, relationDob, houseNo, mohalla, village, ward, panchayat, block, tehsil, district }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "wife": session
      .run("MATCH (a:Person),(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId CREATE (a)-[r:WIFE{name: $relationName, relationDob: $relationDob, voterId: $relationVoterId, houseNo: $houseNo, mohalla: $mohalla, village: $village, ward: $ward, panchayat: $panchayat, block: $block, tehsil: $tehsil, district: $district}]->(b) RETURN type(r)",
        { personVoterId, relationVoterId, relationType, relationName, relationDob, houseNo, mohalla, village, ward, panchayat, block, tehsil, district }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    case "friend": session
      .run("MATCH (a:Person),(b:Person) WHERE a.voterId = $personVoterId AND b.voterId = $relationVoterId CREATE (a)-[r:FRIEND{name: $relationName, relationDob: $relationDob, voterId: $relationVoterId, houseNo: $houseNo, mohalla: $mohalla, village: $village, ward: $ward, panchayat: $panchayat, block: $block, tehsil: $tehsil, district: $district}]->(b) RETURN type(r)",
        { personVoterId, relationVoterId, relationType, relationName, relationDob, houseNo, mohalla, village, ward, panchayat, block, tehsil, district }
      )
      .then(() => {
        res.json({
          status: "ok",
        });
        return;
      })
      .catch();
    default: return;
  }
});

app.post("/api/create-person-details", upload.single('filename'), async (req, res) => {
  let name = req.body.name;
  let familyName = req.body.familyName;
  let dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : "";
  let aadharCardNo = req.body.aadharCardNo;
  let email = req.body.email ? req.body.email : "";
  let primaryPhoneNo = req.body.primaryPhoneNo ? req.body.primaryPhoneNo : "";
  let secondaryPhoneNo = req.body.secondaryPhoneNo ? req.body.secondaryPhoneNo : "";
  let schoolDetails = req.body.schoolDetails ? JSON.parse(req.body.schoolDetails) : [];
  let collegeDetails = req.body.collegeDetails ? JSON.parse(req.body.collegeDetails) : [];
  let occupationDetails = req.body.occupationDetails ? JSON.parse(req.body.occupationDetails) : [];
  let houseNo = req.body.houseNo ? req.body.houseNo : "";
  let mohalla = req.body.mohalla ? req.body.mohalla : "";
  let village = req.body.village ? req.body.village : "";
  let ward = req.body.ward ? req.body.ward : "";
  let panchayat = req.body.panchayat ? req.body.panchayat : "";
  let block = req.body.block ? req.body.block : "";
  let tehsil = req.body.tehsil ? req.body.tehsil : "";
  let district = req.body.district ? req.body.district : "";
  let twitterId = req.body.twitterId ? req.body.twitterId : "";
  let facebookId = req.body.facebookId ? req.body.facebookId : "";
  let instagramId = req.body.instagramId ? req.body.instagramId : "";
  let bankName = req.body.bankName ? req.body.bankName : "";
  let bankIFSCode = req.body.bankIFSCode ? req.body.bankIFSCode : "";
  let beenToSouthKashmir = req.body.beenToSouthKashmir ? req.body.beenToSouthKashmir : false;
  let beenToPakOrheldVisa = req.body.beenToPakOrheldVisa ? req.body.beenToPakOrheldVisa : false;
  let beenOGWorStonePelterOrSmuggler = req.body.beenOGWorStonePelterOrSmuggler ? req.body.beenOGWorStonePelterOrSmuggler : false;
  let arrestesEverForAnyIncident = req.body.arrestesEverForAnyIncident ? req.body.arrestesEverForAnyIncident : false;
  let politicalAffiliation = req.body.politicalAffiliation ? req.body.politicalAffiliation : false;
  let masjidFrequentlyAttended = req.body.masjidFrequentlyAttended ? req.body.masjidFrequentlyAttended : false;
  let armyOrSFAgencies = req.body.armyOrSFAgencies ? req.body.armyOrSFAgencies : false;
  let relativesInPOk = req.body.relativesInPOk ? req.body.relativesInPOk : false;
  let grField = req.body.grField ? req.body.grField : "";
  let comanderComments = req.body.comanderComments ? req.body.comanderComments : "";
  let activeSocialMediaUser = req.body.activeSocialMediaUser ? req.body.activeSocialMediaUser : false;
  let acNumber = req.body.acNumber ? req.body.acNumber : "";
  let acName = req.body.acName ? req.body.acName : "";
  let acPartNumber = req.body.acPartNumber ? req.body.acPartNumber : "";
  let acSectionNumber = req.body.acSectionNumber ? req.body.acSectionNumber : "";
  let acSectionName = req.body.acSectionName ? req.body.acSectionName : "";
  let sectionSerialNumber = req.body.sectionSerialNumber ? req.body.sectionSerialNumber : "";
  let voterId = req.body.voterId ? req.body.voterId : "";
  let gender = req.body.gender ? req.body.gender : "";
  let bankAccountNumber = req.body.bankAccountNumber ? req.body.bankAccountNumber : "";
  let fileName = req.file && req.file.path ? req.file.path : "";
  session
    .run(
      'CREATE (a:Person {acNumber: $acNumber, acName: $acName, acPartNumber: $acPartNumber, acSectionNumber: $acSectionNumber, acSectionName: $acSectionName, sectionSerialNumber: $sectionSerialNumber, voterId: $voterId, gender: $gender, name: $name, familyName: $familyName, dateOfBirth: $dateOfBirth, aadharCardNo: $aadharCardNo, email: $email, primaryPhoneNo: $primaryPhoneNo, secondaryPhoneNo: $secondaryPhoneNo, houseNo: $houseNo, mohalla: $mohalla, village: $village, ward: $ward, panchayat: $panchayat, block: $block, tehsil: $tehsil, district: $district, twitterId: $twitterId, facebookId: $facebookId, instagramId: $instagramId, bankName: $bankName, bankIFSCode: $bankIFSCode, beenToSouthKashmir: $beenToSouthKashmir, beenToPakOrheldVisa: $beenToPakOrheldVisa, beenOGWorStonePelterOrSmuggler: $beenOGWorStonePelterOrSmuggler, arrestesEverForAnyIncident: $arrestesEverForAnyIncident, politicalAffiliation: $politicalAffiliation, masjidFrequentlyAttended: $masjidFrequentlyAttended, armyOrSFAgencies: $armyOrSFAgencies, relativesInPOk: $relativesInPOk, grField: $grField,comanderComments: $comanderComments, activeSocialMediaUser: $activeSocialMediaUser, bankAccountNumber: $bankAccountNumber, fileName: $fileName}) RETURN a',
      { acNumber, acName, acPartNumber, acSectionNumber, acSectionName, sectionSerialNumber, voterId, gender, name, familyName, dateOfBirth, aadharCardNo, email, houseNo, mohalla, village, ward, panchayat, block, tehsil, district, twitterId, facebookId, instagramId, bankName, bankIFSCode, beenToSouthKashmir, beenToPakOrheldVisa, beenOGWorStonePelterOrSmuggler, arrestesEverForAnyIncident, politicalAffiliation, masjidFrequentlyAttended, armyOrSFAgencies, relativesInPOk, comanderComments, activeSocialMediaUser, primaryPhoneNo, secondaryPhoneNo, grField, bankAccountNumber, fileName }
    )
    .then((result) => {
      // create school nodes and add relation
      session
        .run(
          'UNWIND $schoolDetails AS map CREATE (n:Schools) SET n = map RETURN n',
          { schoolDetails }
        )
        .then((res1) => {
          session
            .run("MATCH (a:Person),(b:Schools) WHERE a.voterId = $voterId AND b.voterId = $voterId CREATE (a)-[r:STUDIED_AT]->(b) RETURN type(r)",
              { voterId }
            )
            .then(() => {
              // create college nodes and add relation
              session
                .run(
                  'UNWIND $collegeDetails AS map CREATE (n:Colleges) SET n = map RETURN n',
                  { collegeDetails }
                )
                .then((res1) => {
                  session
                    .run("MATCH (a:Person),(b:Colleges) WHERE a.voterId = $voterId AND b.voterId = $voterId CREATE (a)-[r:STUDIED_AT]->(b) RETURN type(r)",
                      { voterId }
                    )
                    .then(() => {
                      // create occupation nodes and add relation
                      session
                        .run(
                          'UNWIND $occupationDetails AS map CREATE (n:Occupations) SET n = map RETURN n',
                          { occupationDetails }
                        )
                        .then((res1) => {
                          session
                            .run("MATCH (a:Person),(b:Occupations) WHERE a.voterId = $voterId AND b.voterId = $voterId CREATE (a)-[r:HAS_WORKED]->(b) RETURN type(r)",
                              { voterId }
                            )
                            .then(() => {
                            })
                            .catch((e) => console.log(e));
                        })
                        .catch((e) => console.log(e));
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));

      res.json({
        status: "ok",
      });
    })
    .catch((e) => console.log(e));
});

app.use('/api/fetch-users', cors(), (req, res) => {
  const filters = req.query;

  session
    .run('MATCH (n:Person) RETURN n')
    .then((result) => {
      let personArr = [];
      result.records.forEach(function (record) {
        personArr.push({
          id: record._fields[0].identity.low,
          acNumber: record._fields[0].properties.acNumber,
          acName: record._fields[0].properties.acName,
          acPartNumber: record._fields[0].properties.acPartNumber,
          acSectionNumber: record._fields[0].properties.acSectionNumber,
          acSectionName: record._fields[0].properties.acSectionName,
          sectionSerialNumber: record._fields[0].properties.sectionSerialNumber,
          voterId: record._fields[0].properties.voterId,
          gender: record._fields[0].properties.gender,
          name: record._fields[0].properties.name,
          familyName: record._fields[0].properties.familyName,
          aadharCardNo: record._fields[0].properties.aadharCardNo,
          email: record._fields[0].properties.email,
          primaryPhoneNo: record._fields[0].properties.primaryPhoneNo,
          secondaryPhoneNo: record._fields[0].properties.secondaryPhoneNo,
          dateOfBirth: record._fields[0].properties.dateOfBirth,
          houseNo: record._fields[0].properties.houseNo,
          mohalla: record._fields[0].properties.mohalla,
          district: record._fields[0].properties.district,
          village: record._fields[0].properties.village,
          ward: record._fields[0].properties.ward,
          panchayat: record._fields[0].properties.panchayat,
          tehsil: record._fields[0].properties.tehsil,
          block: record._fields[0].properties.block,
          twitterId: record._fields[0].properties.twitterId,
          facebookId: record._fields[0].properties.facebookId,
          instagramId: record._fields[0].properties.instagramId,
          bankName: record._fields[0].properties.bankName,
          bankIFSCode: record._fields[0].properties.bankIFSCode,
          beenToSouthKashmir: record._fields[0].properties.beenToSouthKashmir,
          beenToPakOrheldVisa: record._fields[0].properties.beenToPakOrheldVisa,
          beenOGWorStonePelterOrSmuggler: record._fields[0].properties.beenOGWorStonePelterOrSmuggler,
          arrestesEverForAnyIncident: record._fields[0].properties.arrestesEverForAnyIncident,
          politicalAffiliation: record._fields[0].properties.politicalAffiliation,
          masjidFrequentlyAttended: record._fields[0].properties.masjidFrequentlyAttended,
          armyOrSFAgencies: record._fields[0].properties.armyOrSFAgencies,
          relativesInPOk: record._fields[0].properties.relativesInPOk,
          grField: record._fields[0].properties.grField,
          comanderComments: record._fields[0].properties.comanderComments,
          activeSocialMediaUser: record._fields[0].properties.activeSocialMediaUser,
          bankAccountNumber: record._fields[0].properties.bankAccountNumber,
          fileName: record._fields[0].properties.fileName
        });
      });
      const filteredUsers = personArr.filter(user => {
        let isValid = true;
        for (key in filters) {
          isValid = isValid && user[key] && filters[key] && user[key].toLowerCase().includes(filters[key].toLowerCase());
        }
        return isValid;
      });
      res.send(filteredUsers);
    })
    .catch((err) => console.log(err));

});

app.post("/api/edit-person-details", upload.single('filename'), async (req, res) => {
  let acNumber = req.body.acNumber;
  let acName = req.body.acName;
  let acPartNumber = req.body.acPartNumber;
  let acSectionNumber = req.body.acSectionNumber;
  let acSectionName = req.body.acSectionName;
  let sectionSerialNumber = req.body.sectionSerialNumber;
  let voterId = req.body.voterId;
  let gender = req.body.gender;
  let name = req.body.name;
  let familyName = req.body.familyName;
  let dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : "";
  let aadharCardNo = req.body.aadharCardNo;
  let email = req.body.email ? req.body.email : "";
  let primaryPhoneNo = req.body.primaryPhoneNo ? req.body.primaryPhoneNo : "";
  let secondaryPhoneNo = req.body.secondaryPhoneNo ? req.body.secondaryPhoneNo : "";
  let schoolDetails = req.body.schoolDetails ? JSON.parse(req.body.schoolDetails) : [];
  let collegeDetails = req.body.collegeDetails ? JSON.parse(req.body.collegeDetails) : [];
  let occupationDetails = req.body.occupationDetails ? JSON.parse(req.body.occupationDetails) : [];
  let houseNo = req.body.houseNo ? req.body.houseNo : "";
  let mohalla = req.body.mohalla ? req.body.mohalla : "";
  let village = req.body.village ? req.body.village : "";
  let ward = req.body.ward ? req.body.ward : "";
  let panchayat = req.body.panchayat ? req.body.panchayat : "";
  let block = req.body.block ? req.body.block : "";
  let tehsil = req.body.tehsil ? req.body.tehsil : "";
  let district = req.body.district ? req.body.district : "";
  let twitterId = req.body.twitterId ? req.body.twitterId : "";
  let facebookId = req.body.facebookId ? req.body.facebookId : "";
  let instagramId = req.body.instagramId ? req.body.instagramId : "";
  let bankName = req.body.bankName ? req.body.bankName : "";
  let bankIFSCode = req.body.bankIFSCode ? req.body.bankIFSCode : "";
  let beenToSouthKashmir = req.body.beenToSouthKashmir ? req.body.beenToSouthKashmir : false;
  let beenToPakOrheldVisa = req.body.beenToPakOrheldVisa ? req.body.beenToPakOrheldVisa : false;
  let beenOGWorStonePelterOrSmuggler = req.body.beenOGWorStonePelterOrSmuggler ? req.body.beenOGWorStonePelterOrSmuggler : false;
  let arrestesEverForAnyIncident = req.body.arrestesEverForAnyIncident ? req.body.arrestesEverForAnyIncident : false;
  let politicalAffiliation = req.body.politicalAffiliation ? req.body.politicalAffiliation : false;
  let masjidFrequentlyAttended = req.body.masjidFrequentlyAttended ? req.body.masjidFrequentlyAttended : false;
  let armyOrSFAgencies = req.body.armyOrSFAgencies ? req.body.armyOrSFAgencies : false;
  let relativesInPOk = req.body.relativesInPOk ? req.body.relativesInPOk : false;
  let grField = req.body.grField ? req.body.grField : "";
  let comanderComments = req.body.comanderComments ? req.body.comanderComments : "";
  let activeSocialMediaUser = req.body.activeSocialMediaUser ? req.body.activeSocialMediaUser : false;
  let bankAccountNumber = req.body.bankAccountNumber ? req.body.bankAccountNumber : "";
  let fileName = req.file && req.file.path ? req.file.path : "";
  session
    .run(
      'MATCH (a:Person) WHERE a.voterId = $voterId SET a = {acNumber: $acNumber, acName: $acName, acPartNumber: $acPartNumber, acSectionNumber: $acSectionNumber, acSectionName: $acSectionName, sectionSerialNumber: $sectionSerialNumber, voterId: $voterId, gender: $gender, name: $name, familyName: $familyName, dateOfBirth: $dateOfBirth,aadharCardNo: $aadharCardNo, email: $email, primaryPhoneNo: $primaryPhoneNo, secondaryPhoneNo: $secondaryPhoneNo, houseNo: $houseNo, mohalla: $mohalla, village: $village, ward: $ward, panchayat: $panchayat, block: $block, tehsil: $tehsil, district: $district, twitterId: $twitterId, facebookId: $facebookId, instagramId: $instagramId, bankName: $bankName, bankIFSCode: $bankIFSCode, beenToSouthKashmir: $beenToSouthKashmir, beenToPakOrheldVisa: $beenToPakOrheldVisa, beenOGWorStonePelterOrSmuggler: $beenOGWorStonePelterOrSmuggler, arrestesEverForAnyIncident: $arrestesEverForAnyIncident, politicalAffiliation: $politicalAffiliation, masjidFrequentlyAttended: $masjidFrequentlyAttended, armyOrSFAgencies: $armyOrSFAgencies, relativesInPOk: $relativesInPOk, grField: $grField, comanderComments: $comanderComments, activeSocialMediaUser: $activeSocialMediaUser, bankAccountNumber: $bankAccountNumber, fileName: $fileName} RETURN a',
      { acNumber, acName, acPartNumber, acSectionNumber, acSectionName, sectionSerialNumber, voterId, gender, name, familyName, dateOfBirth, aadharCardNo, email, houseNo, mohalla, village, ward, panchayat, block, tehsil, district, twitterId, facebookId, instagramId, bankName, bankIFSCode, beenToSouthKashmir, beenToPakOrheldVisa, beenOGWorStonePelterOrSmuggler, arrestesEverForAnyIncident, politicalAffiliation, masjidFrequentlyAttended, armyOrSFAgencies, relativesInPOk, comanderComments, activeSocialMediaUser, primaryPhoneNo, secondaryPhoneNo, grField, bankAccountNumber, fileName }
    )
    .then((result) => {

      session
        .run(
          'UNWIND $schoolDetails AS map CREATE (n:Schools) SET n = map RETURN n',
          { schoolDetails }
        )
        .then((res1) => {
          session
            .run("MATCH (a:Person),(b:Schools) WHERE a.voterId = $voterId AND b.voterId = $voterId CREATE (a)-[r:STUDIED_AT]->(b) RETURN type(r)",
              { voterId }
            )
            .then(() => {
              // create college nodes and add relation
              session
                .run(
                  'UNWIND $collegeDetails AS map CREATE (n:Colleges) SET n = map RETURN n',
                  { collegeDetails }
                )
                .then((res1) => {
                  session
                    .run("MATCH (a:Person),(b:Colleges) WHERE a.voterId = $voterId AND b.voterId = $voterId CREATE (a)-[r:STUDIED_AT]->(b) RETURN type(r)",
                      { voterId }
                    )
                    .then(() => {
                      // create occupation nodes and add relation
                      session
                        .run(
                          'UNWIND $occupationDetails AS map CREATE (n:Occupations) SET n = map RETURN n',
                          { occupationDetails }
                        )
                        .then((res1) => {
                          session
                            .run("MATCH (a:Person),(b:Occupations) WHERE a.voterId = $voterId AND b.voterId = $voterId CREATE (a)-[r:HAS_WORKED]->(b) RETURN type(r)",
                              { voterId }
                            )
                            .then(() => {
                            })
                            .catch((e) => console.log(e));
                        })
                        .catch((e) => console.log(e));
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));

      res.json({
        status: "ok",
      });
    })
    .catch((e) => console.log(e));
});

app.get('/api/validate-voterId', (req, res) => {
  const voterId = req.query.voterId;

  session
    .run('MATCH (a:Person) WHERE a.voterId = $voterId RETURN a', { voterId })
    .then((result) => {
      let voterId = [];
      result.records.forEach(function (record) {
        voterId.push({
          id: record._fields[0].identity,
          voterId: record._fields[0].properties.voterId ? record._fields[0].properties.voterId : ""
        })
      });
      if (voterId && voterId.length > 0) {
        res.send("Error");
      }
      else {
        res.send("Success")
      }
    })
    .catch((err) => console.log(err));
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);