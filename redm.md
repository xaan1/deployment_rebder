MongoDB waa database-ka nooca NoSQL ah oo kaydiya xogta si isdabajoog ah iyada oo loo adeegsanayo dukumiintiyo JSON (JavaScript Object Notation) la mid ah, taas oo si weyn uga duwan qaabka SQL ee la isticmaalo jadwalka (tables). Waa mid si gaar ah ugu fiican barnaamijyada waaweyn ee shaqeeya si fudud, oo la habayn karo.

Astaamaha muhiimka ah ee MongoDB:
Document-Oriented: MongoDB waxay xogta ku kaydisaa qaab dukumiintiyo JSON ah (ama BSON), taas oo ka dhigaysa mid dabacsan oo ka duwan jadwalka caadiga ah ee SQL databases.

Scalability: MongoDB waa mid si fudud loo kobcin karo (scalable), taas oo macnaheedu yahay inaad si fudud u kordhin karto xogtaada iyadoo aan la dhibaateynin waxqabadka.

High Availability: Waxay leedahay replica sets, taas oo hubinaysa in xogtaadu ay badbaado tahay haddii serverka mid ka mid ah uu dhaco.

Dynamic Schema: Waxaad abuuri kartaa dukumiintiyo kala duwan oo isku collection ah iyadoo aan loo baahnayn schema adag sida SQL.

Qaababka asaasiga ah:
Database & Collection: MongoDB waxay leedahay databases, oo ay ku jiraan ururinta collections.

Database waa urur xog, sida buugga weyn oo aad kaydisay dhammaan xogta.
Collection waa urur ka kooban dukumiintiyo isku nooc ah, sida buugga cutubyadiisa (chapters).
Document: Dukumiintiyada MongoDB waxay u egyihiin JSON objects-ka JavaScript, waxaana ku jira key-value pairs (koodh iyo qiimo la socda).

Queries muhiim ah oo MongoDB ah:
Insert (Xog cusub geli):

javascript
Copy code
db.collection.insertOne({ name: "Abdirahman", age: 25, profession: "Developer" });
Waxaa lagu gelinayaa dukumiinti cusub ururinta.

Find (Xog raadso):

Find one dukumiinti:

javascript
Copy code
db.collection.findOne({ name: "Abdirahman" });
Dukumiinti kaliya raadso oo leh magaca "Abdirahman".

Find dhawr dukumiinti:

javascript
Copy code
db.collection.find({ age: { $gte: 20 } });
Dukumiintiyada leh da'da ka weyn ama la mid ah 20.

Update (Xog wax ka bedel):

javascript
Copy code
db.collection.updateOne({ name: "Abdirahman" }, { $set: { age: 26 } });
Dukumiintiga "Abdirahman" da'diisa ku beddel 26.

Delete (Xog tirtir):

javascript
Copy code
db.collection.deleteOne({ name: "Abdirahman" });
Dukumiintiga leh magaca "Abdirahman" waa la tirtiraa.

Aggregation (Xog kala shaandhayn):

Tusaale ururinta xogta ee qaybo kala duwan:
javascript
Copy code


db.collection.aggregate([
{ $match: { profession: "Developer" } },
{ $group: { _id: "$age", count: { $sum: 1 } } }
]);
Waxaa la tirinayaa tirada dadka shaqada 'Developer' leh iyadoo la kala shaandhaynayo da'da.
Sort (Xog kala habayn):





javascript
Copy code

db.collection.find().sort({ age: -1 });
Dukumiintiyada waxay ku kala habaysmayaan da'da, iyadoo loo marayo habka hoos u socda (-1).

Limit (Xog xaddid):

javascript
Copy code
db.collection.find().limit(5);
Kaliya 5 dukumiinti ayaa soo baxaysa.

Isticmaalka MongoDB ee development:
MongoDB Compass: Waa interface GUI ah oo kuu sahlaya inaad la falgasho MongoDB adigoon isticmaalin koodh fara badan.

MongoDB Atlas: Waa cloud platform aad ku martigelin karto MongoDB, kaas oo kuu sahlaya inaad sameyso databases iyo collections adigoo isticmaala isdhexgalka webka.

Mongoose (Node.js): Waa library loo isticmaalo inaad MongoDB ku xirto Node.js. Waxay kuu ogolaanaysaa inaad abuurto schema sax ah oo aad u isticmaasho xogta MongoDB.

Tusaale Mongoose ah oo ah CRUD (Create, Read, Update, Delete):
javascript
Copy code
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
name: String,
age: Number,
profession: String
});

const User = mongoose.model('User', userSchema);

// Insert
const newUser = new User({ name: "Abdirahman", age: 25, profession: "Developer" });
newUser.save();

// Find
User.find({ age: { $gte: 20 } });

// Update
User.updateOne({ name: "Abdirahman" }, { age: 26 });

// Delete
User.deleteOne({ name: "Abdirahman" });
Waxaan rajeynayaa inaad fahmi karto MongoDB iyo sida queries muhiimka ah loogu isticmaalo horumarka (development). Haddii aad u baahan tahay tusaalayaal dheeraad ah ama su'aalo kale oo MongoDB la xiriira, waad i weydiin kartaa!

You said:
oky intaa waa fahmay ma jiraa hdda query aa ka tagaty macquul ah in loo baahdo
ChatGPT said:
ChatGPT
Waa wax fiican inaad fahantay! Haddaan ku daro dhowr query oo kale oo muhiim ah oo laga yaabo inaad u baahato:

1. Counting Documents (Xisaabinta dukumiintiyada):
   Waxaa laga yaabaa inaad rabto inaad tiriso dukumiintiyada ku jira collection-ga:
   javascript
   Copy code
   db.collection.countDocuments({ profession: "Developer" });
   Kani wuxuu soo celinayaa tirada dukumiintiyada leh "Developer" ee qaybta profession.
2. Distinct (Qiimayaal kala duwan oo hel):
   Haddii aad rabto inaad hesho qiimayaal kala duwan oo gaar ah oo ku jira field gaar ah:
   javascript
   Copy code
   db.collection.distinct("profession");
   Tani waxay soo celinaysaa qiimayaal kala duwan oo ku jira field-ka profession, tusaale ahaan: ["Developer", "Designer", "Manager"].
3. Exists (Hadii field gaar ah jiro):
   Waxaa laga yaabaa inaad rabto inaad hubiso dukumiintiyada ay ku jiraan field gaar ah:
   javascript
   Copy code
   db.collection.find({ age: { $exists: true } });
   Dukumiintiyada ay ku jiraan age field ayaa la soo helayaa.
4. Regex (Raadinta erayo la mid ah):
   Waxaa laga yaabaa inaad rabto inaad raadiso dukumiintiyo leh magaca oo ku bilaabma xarfo gaar ah:
   javascript
   Copy code
   db.collection.find({ name: { $regex: /^Abdi/ } });
   Dukumiintiyada leh magacyada ku bilaabma "Abdi" ayaa la soo helayaa.
5. In Operator (Helidda qiimayaal badan oo isku field ah):
   Haddii aad rabto inaad soo hesho dukumiintiyada leh mid ka mid ah qiimayaal kala duwan:
   javascript
   Copy code
   db.collection.find({ profession: { $in: ["Developer", "Manager"] } });
   Dukumiintiyada leh "Developer" ama "Manager" ee profession field-ka ayaa soo baxaya.
6. Or Operator (Raadinta xaalado kala duwan):
   Haddii aad rabto inaad soo hesho dukumiintiyo leh mid ka mid ah xaalado badan:
   javascript
   Copy code
   db.collection.find({
   $or: [
   { age: { $lt: 20 } },
   { profession: "Developer" }
   ]
   });
   Dukumiintiyada leh da'da ka yar 20 ama leh profession "Developer" ayaa soo baxaya.
7. Skip (Xogta iska dhaafida):
   Haddii aad rabto inaad iska dhaafto xogta ugu horreysa inta aadan soo saarin dukumiintiyada:
   javascript
   Copy code
   db.collection.find().skip(10).limit(5);
   Tani waxay iska dhaafeysaa 10-ka dukumiinti ee ugu horreeya waxayna soo saartaa 5 dukumiinti oo kaliya.
8. Map-Reduce (Xogta kaydka la falanqeeyo):
   Haddii aad rabto inaad fuliso howlaha xogta ee heer sare ah:
   javascript
   Copy code
   db.collection.mapReduce(
   function() { emit(this.profession, 1); },
   function(key, values) { return Array.sum(values); },
   { out: "profession_count" }
   );
   Tani waxay tirinaysaa inta qof ee ku jira shaqo walba waxayna natiijada dhigeysaa collection cusub oo la yiraahdo profession_count.
9. Indexes (Soo dedejinta raadinta xogta):
   Indexes waa lagama maarmaan si loo dedejiyo queries-ka xogta ee ballaaran:
   javascript
   Copy code
   db.collection.createIndex({ name: 1 });
   Tani waxay abuuraysaa index ku salaysan magaca oo kala soocan (ascending order).
   Hadda waa kuwaas qaar ka mid ah queries kale oo waxtar leh oo laga yaabo inaad u baahato markaad la shaqaynayso MongoDB. Haddii aad su'aalo kale qabto ama aad u baahan tahay sharaxaad dheeraad ah, xor ayaad u tahay inaad i weydiiso!
