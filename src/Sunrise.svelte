<script>

    // 1. 定义接收的参数
    export let apiUrl = "";

    let data = null;
    let loading = true;
    let error = null;

    // 2. 封装获取数据的函数
    async function fetchData(url) {
        if (!url) return;

        loading = true;
        error = null;

        try {
            const response = await fetch(url, {
                headers: {'Accept': 'application/json'}
            });

            if (!response.ok) throw new Error('网络请求失败');

            const json = await response.json();
            data = json;
        } catch (e) {
            error = e.message;
            console.error("获取数据失败:", e);
        } finally {
            loading = false;
        }
    }

    // 3. 响应式声明：当 apiUrl 改变时自动运行 fetchData
    $: if (apiUrl) {
        fetchData(apiUrl);
    }
</script>

<main class="container">
    {#if loading}
        <div class="status-message">正在加载数据...</div>
    {:else if error}
        <div class="status-message error">加载失败: {error}</div>
    {:else if data}
        <section class="header">
            <div class="title-row">
                <h1 class="main-title">{data.display_city_name} {data.display_event_name_cn}</h1>
                <span class="timestamp">{data.tb_event_time}</span>
            </div>

            <div class="info-grid">
                <div class="info-item">
                    <span class="label">{data.display_times_name}</span>
                    <span class="value">{data.display_times_str}</span>
                </div>
                <div class="info-item">
                    <span class="label">预报模型</span>
                    <span class="value">{data.display_model}</span>
                </div>
                <div class="info-item">
                    <span class="label">鲜艳度</span>
                    <span class="value">{data.tb_quality}</span>
                </div>
                <div class="info-item">
                    <span class="label">气溶胶</span>
                    <span class="value">{data.tb_aod}</span>
                </div>
            </div>
        </section>

        <div class="banner">
            <div class="banner-title">邻近地区的火烧云预报</div>
            <div class="banner-sub">当前选择的预报模式：{data.display_model} {data.display_times_str}</div>
            <div class="banner-event">事件：{data.display_event_name_cn}</div>
        </div>

        <table class="data-table">
            <thead>
            <tr>
                <th>序号</th>
                <th>城市/地区</th>
                <th>北京时间</th>
                <th>质量</th>
                <th>AOD</th>
            </tr>
            </thead>
            <tbody>
            {#each data.proximate_city_dict_list as city, i}
                <tr>
                    <td>{i + 1}</td>
                    <td>{city.city_name}</td>
                    <td>{city.event_time_bjt_str}</td>
                    <td>{city.local_quality}</td>
                    <td>{city.local_aod}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    {/if}
</main>

<style>
    /* 保留您原始的样式代码 */
    .container {
        max-width: 1000px;
        /*margin: 10px auto;*/
        border: 1px solid #30363d;
        border-radius: 6px;
        overflow: hidden;
        font-family: sans-serif;
    }

    .status-message {
        padding: 20px;
        text-align: center;
        color: #8b949e;
    }

    .status-message.error {
        color: #f85149;
    }

    .header {
        padding: 15px 20px;
        border-bottom: 1px solid #30363d;
    }

    .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .main-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
    }

    .timestamp {
        font-size: 1.1rem;
        font-weight: bold;
    }

    .info-grid {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .info-item {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
    }

    .label {
        color: #8b949e;
    }

    .banner {
        padding: 15px 20px;
        border-bottom: 1px solid #30363d;
    }

    .banner-title {
        font-weight: bold;
        margin-bottom: 4px;
    }

    .banner-sub, .banner-event {
        font-size: 0.85rem;
        color: #8b949e;
    }

    .data-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
    }

    .data-table th {
        color: #8b949e;
        text-align: left;
        padding: 12px 15px;
        border-bottom: 2px solid #30363d;
    }

    .data-table td {
        padding: 10px 15px;
        border-bottom: 1px solid #21262d;
    }

    .data-table th:first-child, .data-table td:first-child {
        width: 60px;
    }
</style>