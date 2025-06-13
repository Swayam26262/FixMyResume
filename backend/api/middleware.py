import logging

logger = logging.getLogger(__name__)

class HeaderLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Using warning level to ensure it's visible in production logs
        logger.warning(f"INCOMING REQUEST TO: {request.path}")
        logger.warning(f"INCOMING HEADERS: {request.headers}")
        response = self.get_response(request)
        return response
