﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Pims.Dal.Entities
{
    [Table("PIMS_ACQ_OWNER_COMP_REQ_CHQ")]
    [Index(nameof(AcquisitionOwnerId), Name = "AOCRCQ_ACQUISITION_OWNER_ID_IDX")]
    public partial class PimsAcqOwnerCompReqChq
    {
        [Key]
        [Column("ACQ_OWNER_COMP_REQ_CHQ_ID")]
        public long AcqOwnerCompReqChqId { get; set; }
        [Column("ACQUISITION_OWNER_ID")]
        public long AcquisitionOwnerId { get; set; }
        [Column("PRETAX_AMT", TypeName = "money")]
        public decimal? PretaxAmt { get; set; }
        [Column("TAX_AMT", TypeName = "money")]
        public decimal? TaxAmt { get; set; }
        [Column("TOTAL_AMT", TypeName = "money")]
        public decimal? TotalAmt { get; set; }
        [Column("CONCURRENCY_CONTROL_NUMBER")]
        public long ConcurrencyControlNumber { get; set; }
        [Column("APP_CREATE_TIMESTAMP", TypeName = "datetime")]
        public DateTime AppCreateTimestamp { get; set; }
        [Required]
        [Column("APP_CREATE_USERID")]
        [StringLength(30)]
        public string AppCreateUserid { get; set; }
        [Column("APP_CREATE_USER_GUID")]
        public Guid? AppCreateUserGuid { get; set; }
        [Required]
        [Column("APP_CREATE_USER_DIRECTORY")]
        [StringLength(30)]
        public string AppCreateUserDirectory { get; set; }
        [Column("APP_LAST_UPDATE_TIMESTAMP", TypeName = "datetime")]
        public DateTime AppLastUpdateTimestamp { get; set; }
        [Required]
        [Column("APP_LAST_UPDATE_USERID")]
        [StringLength(30)]
        public string AppLastUpdateUserid { get; set; }
        [Column("APP_LAST_UPDATE_USER_GUID")]
        public Guid? AppLastUpdateUserGuid { get; set; }
        [Required]
        [Column("APP_LAST_UPDATE_USER_DIRECTORY")]
        [StringLength(30)]
        public string AppLastUpdateUserDirectory { get; set; }
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

        [ForeignKey(nameof(AcquisitionOwnerId))]
        [InverseProperty(nameof(PimsAcquisitionOwner.PimsAcqOwnerCompReqChqs))]
        public virtual PimsAcquisitionOwner AcquisitionOwner { get; set; }
    }
}