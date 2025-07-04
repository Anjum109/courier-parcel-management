MERN Stack Assignment: Courier and Parcel Management System
🔹 About Project
I have made a project that includes three roles:

Admin

Customer

Delivery Agent

👤 Customer Panel
When a user signs up or logs in as a Customer, they are redirected to their Dashboard.

From the Parcel Booking section, the customer can book a parcel by entering:

Pickup address

Delivery address

Parcel size/type

Payment method (COD or prepaid)

After submission, a message shows whether the booking is successful or not.

The customer can go to Booking History to view all parcel bookings and their current status, from Booked to Delivered.

There is a Track Parcel button, where the current location of the parcel is shown on a map in real-time.

Customers can also view the delivery agent who is assigned to the parcel by clicking Show Agent.

Before a parcel is assigned to an agent, the customer can cancel or delete the parcel from the list.

🛠️ Admin Dashboard
Admin can view metrics such as:

Total daily bookings

Total COD amount

Failed deliveries count

Admin can download data using Export CSV or Export PDF.

Under All Parcels, admin can see the details of every parcel.

From there, admin can assign delivery agents to parcels.

Under User Management, admin can see details of all users and also change user roles — like making someone an admin, delivery agent, or customer.

🚴‍♂️ Delivery Agent Dashboard
When a delivery agent logs in, they can view all assigned parcels.

The agent can send their current location using a button, which is shown on the customer’s tracking screen.

The agent can update parcel status like:

Picked Up

In Transit

Delivered

Failed

If a delivery is not possible, they can mark it as Canceled.

⚙️ Technologies Used
Frontend: Next.js

Design: Tailwind CSS

Icons: React Icons

Backend: Node.js + Express

Database: MongoDB

Authentication: JWT + Cookies

Real-Time Updates: Socket.IO

Map Tracking: Google Maps API

📦 Features Implemented Based on Assignment
[✅] Register/Login for all roles

[✅] Role-based access

[✅] Parcel booking and management

[✅] Agent assignment

[✅] Parcel status updates

[✅] Real-time tracking via Socket.IO

[✅] Google Maps integration

[✅] Admin metrics dashboard

[✅] CSV/PDF report exports

📝 Deliverables (Done)
✅ GitHub Repository with code

✅ Hosted Web App (Vercel)

✅ Postman Collection for API testing

✅ PDF Final Report

✅ Video Demo