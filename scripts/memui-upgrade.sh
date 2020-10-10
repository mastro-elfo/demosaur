URL="https://api.github.com/repos/mastro-elfo/mastro-elfo-mui/releases/latest"
# Output of extracted files
OUTPUT_DIR="src/mastro-elfo-mui/"
# Match pattern to extract files
PATTERN=""
# Temporary paths
TMP_DIR="/tmp/download"
LATEST="$TMP_DIR/latest"

# Create the temporary directory tree
echo "Make temporary directory: $TMP_DIR"
echo "mkdir -p $TMP_DIR"
mkdir -p "$TMP_DIR"

# Create output directory tree
echo "Make output directory: $OUTPUT_DIR"
echo "mkdir -p $OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Download json file, then find the line with "tarball_url", then extract its value (the archive url), then wget the archive
echo "Download URL: $URL"
echo "curl $URL | grep tarball_url | cut -d '\"' -f 4 | wget -i - -O $LATEST"
curl "$URL" | grep tarball_url | cut -d '"' -f 4 | wget -i - -O "$LATEST"

# Extract files from the archive that match "PATTERN" into output directory
echo "Extract"
echo "tar --strip 1 -C $OUTPUT_DIR --wildcards $PATTERN -zxvf $LATEST"
tar --strip 1 -C "$OUTPUT_DIR" --wildcards "$PATTERN" -zxvf "$LATEST"

# Clean temporary directory
echo "Clean"
echo "rm -rf $TMP_DIR"
rm -rf "$TMP_DIR"
