# Navigate to the local repository directory
cd /var/www/deployment/pwd-unindra

# Pull the latest changes from the remote repository
sudo git pull https://$GITHUB_USERNAME:$GITHUB_PAT@github.com/alifanza259/pwd-unindra.git

# Create new version folder and move html files there
now=$(date +"%s")
cd /var/www/html/deployment
sudo rm pwd-unindra

cd /var/www/deployment/pwd-unindra/release
folderName=release-$now
sudo mkdir $folderName

cd /var/www/deployment/pwd-unindra
sudo cp *.html release/$folderName
sudo ln -s -T /var/www/deployment/pwd-unindra/release/$folderName /var/www/html/deployment/pwd-unindra

echo "Done: $(date)"