## Install MongoDB on ubuntu

1. Update the package list and install the necessary dependencies:
   sudo apt update
   sudo apt install mongodb-org
2. Start the MongoDB service:
   sudo systemctl start mongod
3. Enable the MongoDB service to start automatically at boot:
   sudo systemctl enable mongod
4. Verify that MongoDB is running:
   sudo systemctl status mongod
