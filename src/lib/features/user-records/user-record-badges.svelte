<script lang="ts">
  import IsAlphaKilledBadge from "./badges/is-alpha-killed-badge.svelte";
  import IsGammaKilledBadge from "./badges/is-gamma-killed-badge.svelte";
  import IsOmegaKilledBadge from "./badges/is-omega-killed-badge.svelte";
  import IsWickelineKilledBadge from "./badges/is-wickeline-killed-badge.svelte";
  import PreMadeTeamBadge from "./badges/pre-made-team-badge.svelte";

  interface Props {
    preMadeTeamSize: number;
    isAlphaKilled: boolean;
    isOmegaKilled: boolean;
    isGammaKilled: boolean;
    isWickelineKilled: boolean;
  }
  let { preMadeTeamSize, isAlphaKilled, isOmegaKilled, isGammaKilled, isWickelineKilled }: Props =
    $props();
</script>

<PreMadeTeamBadge preMadeTeam={preMadeTeamSize} />
<IsWickelineKilledBadge killed={isWickelineKilled} />
<IsGammaKilledBadge killed={isGammaKilled} />
<IsOmegaKilledBadge killed={isOmegaKilled} />
<IsAlphaKilledBadge killed={isAlphaKilled} />
