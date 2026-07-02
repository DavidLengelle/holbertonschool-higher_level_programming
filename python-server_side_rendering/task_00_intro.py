#!/usr/bin/python3
"""Module that generates personalized invitation files from a template"""


def generate_invitations(template: str, attendees: list) -> None:
    """Write one personalized invitation file per attendee from a template"""

    if not isinstance(template, str) or not isinstance(attendees, list) or not all(isinstance(a, dict) for a in attendees):
        print("Error: Invalid input parameters.")
        return

    if template == "":
        print("Template is empty, no output files generated.")
        return

    if not attendees:
        print("No data provided, no output files generated.")
        return

    for index, attendee in enumerate(attendees, start=1):
        output = template
        for key in ["name", "event_title", "event_date", "event_location"]:
            value = attendee.get(key)
            if value is None:
                value = "N/A"
            output = output.replace("{" + key + "}", value)

        with open(f"output_{index}.txt", "w") as file:
            file.write(output)
