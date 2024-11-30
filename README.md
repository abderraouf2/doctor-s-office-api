
# Doctor's Office API

This project provides a RESTful API that enables efficient management of doctor-patient interactions, including appointment scheduling, approvals, and other related functionalities. The API is designed for seamless integration with front-end applications to create a robust healthcare management solution.



## Features

- Appointment Scheduling: Patients can request appointments with doctors.
- Approval System: Doctors can review and approve appointment requests.
- Secure Authentication: Protects sensitive data and ensures proper access control.
- Scalable Design: Built to support multiple doctors, patients, and clinics.


## Installation

Clone the Repository

```bash
    git clone https://github.com/abderraouf2/doctor-s-office-api.git
    cd doctor-s-office-api
```
    
Install Dependencies

```bash
npm install
```

Set Up Environment Variables Create a .env file in the root directory with the following variables:

```bash
JWT_SECRET=secret_world             # Secret key for JWT authentication
DB_HOST=localhost                   # Database host
DB_PORT=5432                        # Database port
DB_PASSWORD=postgres                # Database password
DB_USERNAME=postgres                # Database username
DB_NAME=doctor_db                   # Name of the database
```

Run the Application

```bash
npm run start:dev
```
## Database connection

To connect to the postgres database you have 2 options:

#### 1. Install postgres on your machine:
If you don't have it already, you need to install it and create the data base specified in the .env file.

#### 2. Use docker:
Or you can use docker to get a postgres image and run it.

to do that: 
- Enter the root directory of the project.

- Ensure Docker and docker-compose are installed on your machine.

- On your terminal:

```bash
docker-compose -f postgres.yml up
```

This will run a postgres docker container, and you can use it to connect to the database.

Check the file `postgres.yml` on the root directory of the project



## How to use it.

#### Create a doctor

```http
  POST http://localhost:3000/doctors/new-doctor
```

Body:
| Attribute | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. |
| `name` | `string` | **Required**. |
| `specialization` | `string` | **Required**. |
| `Password` | `string` | **Required**. |


#### Create a Patient

```http
  POST http://localhost:3000/patients/create
```

Body:
| Attribute | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. |
| `name` | `string` | **Required**. |
| `date_of_birth` | `string` | **Required**. ( String for dev purposes ) |
| `address` | `string` | **Required**. |
| `Password` | `string` | **Required**. |


#### Authentication

##### Specify the role of the user you want to authenticate: 

roles: [`doctor`, `patient`]

```http
  http://localhost:3000/auth/${role}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `role`      | `string` | **Required**. role must be specified |

#### Returns the Authorization token.

This will return a JWT token that you can use to perform next actions.


#### Create an appointment

```http
  POST http://localhost:3000/appointments
```
#### This route is protected, which means only doctors can create an appointment
#### Auth token must be included in the Authorization section as `Bearer token`

Body:
| Attribute | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `date` | `string` | **Required**.  ( String for dev purposes )|
| `time` | `string` | **Required**.  ( String for dev purposes )|
| `reason` | `string` | **Required**. |
| `patient` | `number` | **Required**. |
| `doctor` | `number` | **Required**. |


#### Request an appointment
For patients, they can request an appointment and doctors can approve it.

```http
  POST http://localhost:3000/appointments/request
```
#### This route is protected, which means only patients can create an appointment
#### Auth token must be included in the Authorization section as `Bearer token`

Body:
| Attribute | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `date` | `string` | **Required**.  ( String for dev purposes )|
| `time` | `string` | **Required**. ( String for dev purposes ) |
| `reason` | `string` | **Required**. |
| `patient` | `number` | **Required**. |
| `doctor` | `number` | **Required**. |


#### Change appointment status

```http
  PATCH http://localhost:3000/appointments
```
#### This route is protected, which means only doctors can change appointments status
#### Auth token must be included in the Authorization section as `Bearer token`

Body:
| Attribute | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `status` | `string` | **Required**.|

status can be: `Pending`, `Approved`, `Rejected`, and `Canceled`


#### Get patient appointments

#### This route is protected, which means only patients can fetch patient appointments
#### Auth token must be included in the Authorization section as `Bearer token`

```http
  GET http://localhost:3000/appointments/patient-appointments/${id}
```
include the `patient id`.


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. patient id must be specified |


#### Get doctor appointments

#### This route is protected, which means only doctors can fetch the appointments.
#### Auth token must be included in the Authorization section as `Bearer token`


```http
  GET http://localhost:3000/appointments/patient-appointments/${id}
```
include the `patient id`.


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. patient id must be specified |


## Postman Collection
You can download the Postman collection for this API [here](https://github.com/abderraouf2/doctor-s-office-api/blob/main/postman_collection/doctors-office%20api.postman_collection.json).
