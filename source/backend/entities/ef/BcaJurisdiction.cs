﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Pims.Dal.Entities
{
    [Table("BCA_JURISDICTION")]
    [Index(nameof(AreaCode), Name = "BCAJUR_AREA_CODE_IDX")]
    public partial class BcaJurisdiction
    {
        public BcaJurisdiction()
        {
            BcaFolioRecords = new HashSet<BcaFolioRecord>();
        }

        [Key]
        [Column("JURISDICTION_CODE")]
        [StringLength(16)]
        public string JurisdictionCode { get; set; }
        [Column("AREA_CODE")]
        [StringLength(16)]
        public string AreaCode { get; set; }
        [Column("DESCRIPTION")]
        [StringLength(255)]
        public string Description { get; set; }
        [Column("TOTAL_FOLIO_COUNT")]
        public int? TotalFolioCount { get; set; }
        [Column("TAXABLE_FOLIO_COUNT")]
        public int? TaxableFolioCount { get; set; }
        [Column("TAX_EXEMPT_FOLIO_COUNT")]
        public int? TaxExemptFolioCount { get; set; }
        [Column("TOTAL_GROSS_LAND_VALUE", TypeName = "money")]
        public decimal? TotalGrossLandValue { get; set; }
        [Column("TOTAL_GROSS_IMPROVEMENT_VALUE", TypeName = "money")]
        public decimal? TotalGrossImprovementValue { get; set; }
        [Column("TOTAL_TAX_EXEMPT_LAND_VALUE", TypeName = "money")]
        public decimal? TotalTaxExemptLandValue { get; set; }
        [Column("TOTAL_TAX_EXEMPT_IMPROVEMENT_VALUE", TypeName = "money")]
        public decimal? TotalTaxExemptImprovementValue { get; set; }
        [Column("TOTAL_NET_LAND_VALUE", TypeName = "money")]
        public decimal? TotalNetLandValue { get; set; }
        [Column("TOTAL_NET_IMPROVEMENT_VALUE", TypeName = "money")]
        public decimal? TotalNetImprovementValue { get; set; }
        [Column("DB_CREATE_TIMESTAMP", TypeName = "datetime")]
        public DateTime DbCreateTimestamp { get; set; }
        [Required]
        [Column("DB_CREATE_USERID")]
        [StringLength(30)]
        public string DbCreateUserid { get; set; }
        [Column("DB_LAST_UPDATE_TIMESTAMP", TypeName = "datetime")]
        public DateTime DbLastUpdateTimestamp { get; set; }
        [Required]
        [Column("DB_LAST_UPDATE_USERID")]
        [StringLength(30)]
        public string DbLastUpdateUserid { get; set; }

        [ForeignKey(nameof(AreaCode))]
        [InverseProperty(nameof(BcaAssessmentArea.BcaJurisdictions))]
        public virtual BcaAssessmentArea AreaCodeNavigation { get; set; }
        [InverseProperty(nameof(BcaFolioRecord.JurisdictionCodeNavigation))]
        public virtual ICollection<BcaFolioRecord> BcaFolioRecords { get; set; }
    }
}