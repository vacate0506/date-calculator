<script>
    import DateCalculator from "./DateCalculator.svelte";
    import DateReminder from "./DateReminder.svelte";
    import ChartComponent from './ChartComponent.svelte';
    import Sunrise from "./Sunrise.svelte";
    import Map from "./Map.svelte";

    let sunriseUrl , sunsetUrl;

    const handleGet = () => {
        sunriseUrl = "/api/detailed/?query_id=3300974&intend=select_city&query_city=%E4%B8%8A%E6%B5%B7%E5%B8%82-%E4%B8%8A%E6%B5%B7&model=GFS&event_date=None&event=rise_2&times=None";
        sunsetUrl = "/api/detailed/?query_id=1583892&intend=select_city&query_city=%E4%B8%8A%E6%B5%B7%E5%B8%82-%E4%B8%8A%E6%B5%B7&model=GFS&event_date=None&event=set_2&times=None";
    }
</script>

<main >
    <Map/>
    <div class="wrap">
        <DateCalculator/>
        <DateReminder/>
    </div>
    <div class="chart">
        <ChartComponent/>
    </div>
    <div>
        <h4 class="header" >日出日落<span on:dblclick={handleGet}>预</span>测</h4>
        {#if sunriseUrl}
        <div class="sunrise">
            <Sunrise apiUrl={sunriseUrl}/>
            <Sunrise apiUrl={sunsetUrl}/>
        </div>
        {/if}
    </div>
</main>

<style>
    :global(*) {
        box-sizing: border-box;
    }

    :global(body) {
        background-color: rgb(231, 231, 231);
    }

    .wrap {
        display: flex;
        justify-content: space-around;
        margin: 0 auto;
    }

    .sunrise {
        display: flex;
        justify-content: center;
    }

    .header {
        user-select: none;
        text-align: center;
    }
</style>
