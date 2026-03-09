[
    {
        "id": "338a1eb55cc91ce003f63ff90d2693c7",
        "value": {
            "actionRequests": [
                {
                    "name": "send_email",
                    "args": {
                        "to": ["sujoy@codersgyan.com"],
                        "subject": "Design update?",
                        "body": "Hi Sujoy,\n\nHope you're doing well.\n\nDo you have an update on the design? If possible, could you share the current status and any blockers?\n\nThanks!\n\n--[Your Name]"
                    },
                    "description": "Outbound email pending approval\n\nTool: send_email\nArgs: {\n  \"to\": [\"sujoy@codersgyan.com\"],\n  \"subject\": \"Design update?\",\n  \"body\": \"Hi Sujoy,\\n\\nHope you're doing well.\\n\\nDo you have an update on the design? If possible, could you share the current status and any blockers?\\n\\nThanks!\\n\\n--[Your Name]\"\n}"
                }
            ],
            "reviewConfigs": [
                {
                    "actionName": "send_email",
                    "allowedDecisions": ["approve", "edit", "reject"]
                }
            ]
        }
    }
]