import logging
from app.config import PHP_STORAGE_URL

logger = logging.getLogger("livechat.db")


def init_db():
    """Stateless mode for Render: all data is managed directly by external PHP server."""
    logger.info(f"[DB] Stateless mode: all data served directly from single external PHP storage ({PHP_STORAGE_URL})")
