# Project: "Office Queue Management System"  
## Group: 5  

## React Client Application Routes

- Route `/`: The homepage that introduces the queue management system. It displays a list of services with two buttons: one for customers and one for officers, and a third button to simulate admin login.
- Route `/customer`: Page where the customer can view the list of services along with their estimated processing times.
- Route `/officer`: Page for officers with two buttons: one to call the next customer and another to indicate that they have finished serving the current customer.
- Route `/admin`: Page for the administrator where they can view statistics and configure the counters.

## API Server

### GET `/api/services`
- **response body**: 
  - `200 OK` with an array of available services and their estimated times:
  ```json
  [ { "id": number, "name": string, "estimatedTime": number } ]
  ```

### POST `/api/tickets`
- **request body**: `{ serviceId: number, userId: number }`
- **response body**: 
  - `200 OK` with the generated ticket `{ ticketId: number, service: string, estimatedTime: number }`
  - `400 Bad Request` if there are errors in the request.

### GET `/api/waiting-time/:ticketId`
- **request params**: `ticketId` (ID of the ticket)
- **response body**: 
  - `200 OK` with the estimated waiting time for the specific ticket `{ estimatedTime: number }`
  - `404 Not Found` if the ticket does not exist.

### POST `/api/counters/config`
- **request body**: `{ counterId: number, serviceId: number }`
- **response body**:
  - `200 OK` if the configuration was successful.
  - `400 Bad Request` if the validation fails.

### GET `/api/stats`
- **response body**:
  - `200 OK` with statistics on service times and clients served.

### GET `/api/stats/:serviceId`
- **response body**
  - `200 OK` with statistics on service time and client served for the specific service

## Database Tables

- Table `services`: Stores information about available services.
  - Columns:
    - `id` (integer)
    - `name` (string)
    - `estimatedTime` (integer)

- Table `tickets`: Stores tickets generated by users.
  - Columns:
    - `id` (integer)
    - `userId` (integer)
    - `serviceId` (integer)
    - `createdAt` (timestamp)

- Table `counters`: Stores counters, which can handle multiple services.
  - Columns:
    - `id` (integer)

- Table `counter_services`: Stores which services are assigned to which counters.
  - Columns:
    - `counterId` (integer)
    - `serviceId` (integer)

## Main React Components

- `HomePage` (in `HomePage.jsx`): 
  - **Purpose**: Displays the list of services and buttons for customer, officer, and admin login.
  - **Functionality**: Allows users to choose their role to access the relevant sections of the application.

- `CustomerPage` (in `CustomerPage.jsx`): 
  - **Purpose**: Displays the list of services with their estimated processing times.
  - **Functionality**: Allows customers to select a service and obtain a ticket.

- `OfficerPage` (in `OfficerPage.jsx`): 
  - **Purpose**: Provides two buttons for officers: one to call the next customer and another to indicate that they have finished serving the current customer.
  - **Functionality**: Interacts with the system to manage the queue and provide updates.

- `AdminPage` (in `AdminPage.jsx`): 
  - **Purpose**: Allows the administrator to view statistics and configure the counters.
  - **Functionality**: Provides insights into queue lengths and service times, and enables configuration changes.