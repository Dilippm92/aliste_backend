const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// Import electrician data from the JSON file
const electricians = require('../data/electricians.json');
const sites = require("../data/siteData.json")
router.use(bodyParser.json());


router.get('/sitedata', (req, res) => {
  // Serve electrician data as JSON
  res.json(sites);
});


router.post('/updatesites', (req, res) => {
  const sites = req.body;

  for (let i = 0; i < sites.length; i++) {
    if (sites[i].dateInput !== "") {
      for (let j = 0; j < electricians.length; j++) {
        if (sites[i].grievance === true && electricians[j].grievanceElectrician === true) {
         
         
          const dateIndex = electricians[j].zone.findIndex(entry => entry.date === sites[i].dateInput);
          if (dateIndex !== -1 && electricians[j].zone[dateIndex].count<=3 ) {
            
            sites[i].AssignedElectritian.push({
              name: electricians[j].name,
              date: sites[i].dateInput
            })
            electricians[j].zone[dateIndex].count++;
            break;
          } else if (dateIndex == -1){
            const assignedElectrician = {
           
              date: sites[i].dateInput,
              count: 1
            };
            sites[i].AssignedElectritian.push({
              name: electricians[j].name,
              date: sites[i].dateInput
            })
            electricians[j].zone = [assignedElectrician];
            break;
          }else{
            continue;
          }
          
        } else if (sites[i].grievance === false && electricians[j].grievanceElectrician === false) {
          const dateIndex = electricians[j].zone.findIndex(entry => entry.date === sites[i].dateInput);
          if (dateIndex !== -1 && electricians[j].zone[dateIndex].count<3 ) {
            
            sites[i].AssignedElectritian.push({
              name: electricians[j].name,
              date: sites[i].dateInput
            })
            electricians[j].zone[dateIndex].count++;
            break;
          } else if (dateIndex == -1){
            const assignedElectrician = {
           
              date: sites[i].dateInput,
              count: 1
            };
            sites[i].AssignedElectritian.push({
              name: electricians[j].name,
              date: sites[i].dateInput
            })
            electricians[j].zone = [assignedElectrician];
            break;
          }else{
            continue;
          }
        }
      }
    } else {
      continue;
    }
  }

  res.json(sites)
});


module.exports = router;