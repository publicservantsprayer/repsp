# Updating the Data

## KnowWho Data

After downloading the zip archives from KnowWho we need to import the data into Google spreadsheets. This normalizes CSV files and removes inconsistencies and errors.

For each of the Federal and State members do the following

1. Unzip the `.csv` file
1. Create a new Google spreadsheet
1. In that spreadsheet, go to File -> Import, click the `Upload` tab
1. Drag `Members.csv` file into target
1. The option, "Convert text, numbers, data" should be changed to "no"
1. Name the spreadsheet with either "Federal" or "State" and include month/year.
1. Change permissions to be read by anyone on the internet.

Now you have two Google spreadsheets with Federal and State data.

1. Log in to thepsp.org and go to Data Import and click the "Imports" tab
1. Click "Create New Import"
1. Copy the Federal and State Google Sheets URLs over to each field
1. Click save

---

## Extract Photos

We need to unzip both the federal and state photos from their zip archives into a single directory.

Change to the directory where photos were downloaded.

Unzip all of the images in the `.zip` file ignoring file structure (`-j`) and put them in a directory called `photos` with (`-d`).

```
unzip -j fedleg_photos_*.zip -d photos && unzip -j stateleg_photos_*.zip -d photos
```

---

## Upload Photos

Upload any new images using rsync from the `photos` directory to the google storage bucket.

```
gsutil -m rsync photos gs://repsp123-leaders
```
