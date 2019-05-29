---
layout: default
title: Financial Reports
---

<div class="message info">
  <a href="{% link foundation-fund-update.md %}"><p><strong>Announcement:</strong> Foundation Funds Update</p></a>
</div>

Reports to be uploaded via PDF every quarter.

<div class="financial-statements">
{% assign financial_statements = site.static_files | where: "pdf", true | reverse %}
{% for statement in financial_statements %}
  <a class="statement" href="{{ statement.path }}" title="Download PDF" target="_blank">
    <i class="ico ico-pdf"></i>
    <span class="name">{{ statement.name }}</span>
    <!--span class="date">{{ statement.modified_time | date_to_string }}</span-->
  </a>
{% endfor %}
</div>

- Prices are based on coinmarketcap.com
- Figures are unaudited and subject to change