from flask import Flask, jsonify
import pandas as pd
import requests
from io import StringIO

app = Flask(__name__)

@app.route('/climate-data')
def climate_data():
    github_repo_owner = "NASA-IMPACT"
    github_repo_name = "noaa-viz"
    folder_path_co2 = "flask/c02"
    
    combined_df_co2 = pd.DataFrame()

    def append_github_file(file_url):
        response = requests.get(file_url)
        response.raise_for_status()
        return response.text

    # Get the list of CO2 files in the specified directory using GitHub API
    github_api_url = f"https://api.github.com/repos/{github_repo_owner}/{github_repo_name}/contents/{folder_path_co2}"
    response = requests.get(github_api_url)
    response.raise_for_status()
    file_list_co2 = response.json()

    for file_info in file_list_co2:
        if file_info["name"].endswith("txt"):
            file_content = append_github_file(file_info["download_url"])
            Lines = file_content.splitlines()
            index = Lines.index("# VARIABLE ORDER") + 2
            df = pd.read_csv(StringIO("\n".join(Lines[index:])), delim_whitespace=True)
            combined_df_co2 = pd.concat([combined_df_co2, df], ignore_index=True)

    site_to_filter = 'ABP'
    filtered_df = combined_df_co2[combined_df_co2['site_code'] == site_to_filter]
    filtered_df['datetime'] = pd.to_datetime(filtered_df['datetime'])
    filtered_df.set_index('datetime', inplace=True)

    # Convert DataFrame to JSON
    return jsonify(filtered_df['value'].to_dict())

if __name__ == '__main__':
    app.run(debug=True)
