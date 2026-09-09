/**
 * useGlobalVoiceAgent — Backwards-compatible hook re-exporting from VoiceAgentContext.
 * Ensures site-wide single-state synchronization for the AI Voice Assistant.
 */
export {
  useVoiceAgent,
  useVoiceAgent as useGlobalVoiceAgent,
  AGENT_STATUS,
  SERVICES_CATALOG,
  VoiceAgentProvider,
} from "../context/VoiceAgentContext";
