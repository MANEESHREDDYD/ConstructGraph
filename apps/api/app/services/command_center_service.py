from app.data.demo_loader import validate_and_load_command_center_payload
from app.domain.models import CommandCenterPayload

def get_command_center_payload() -> CommandCenterPayload:
    """
    Returns the aggregated payload for the Project Command Center dashboard.
    The demo loader already performs the validation and aggregation for the demo dataset.
    """
    payload = validate_and_load_command_center_payload()
    return payload
