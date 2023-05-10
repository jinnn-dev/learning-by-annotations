import os

from supertokens_python.recipe import (
    session,
    emailpassword,
    dashboard,
    usermetadata,
    userroles,
)
from supertokens_python import (
    InputAppInfo,
    SupertokensConfig,
)

supertokens_config = SupertokensConfig(connection_uri="http://supertokens:3567")

app_info = InputAppInfo(
    app_name="Patholearn Authentication",
    api_domain=os.environ.get("API_DOMAIN", "http://localhost:3001"),
    website_domain=os.environ.get("WEBSITE_DOMAIN", "http://localhost:5174"),
)

framework = "fastapi"

# recipeList contains all the modules that you want to
# use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
recipe_list = [
    emailpassword.init(sign_up_feature=emailpassword.InputSignUpFeature()),
    session.init(),
    dashboard.init(),
    usermetadata.init(),
    userroles.init(),
]